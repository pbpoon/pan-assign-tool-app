import {Component, OnInit} from '@angular/core';
import {from, merge, Observable} from 'rxjs';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../shared';
import {EditComponent} from '../edit/edit.component';
import {filter, map, mergeMap, reduce, switchMap, tap} from 'rxjs/operators';
import {ToastService} from 'ng-zorro-antd-mobile';

export interface IPeople {
  name: string
  count: number
  tools: number
}

@Component({
  selector: 'app-detail',
  template: `
    <app-top-bar (handlerLeftClick)="onLeftClick()" (handlerRightClick)="onRightClick()">{{(activity$|async)?.name}}</app-top-bar>
    <div class="paddingTop"></div>
    <!--    <WhiteSpace size="lg"></WhiteSpace>-->
    <div class="search-wrap">
      <input type="search" class="search" (input)="handleSearch(inputSearch.value)" #inputSearch>
    </div>
    <ng-container *ngIf="(peopleList$|async) as peopleList">
      <List [className]="'my-list'">
        <ListItem multipleLine
                  [arrow]="'horizontal'"
                  *ngFor="let people of peopleList"
                  (onClick)="onUpdate(people)">
          {{people.name}}
          <Brief>出席人数:{{people.count}} / 工具:{{people.tools}}</Brief>
        </ListItem>
      </List>
      <WhiteSpace [size]="'xl'"></WhiteSpace>
      <div Button (click)="sum()">生成统计</div>
    </ng-container>
    <div class="no-content" *ngIf="(peopleList$|async)?.length===0">
      <h2>
        没有记录
      </h2>
    </div>
  `,
  styles: [`
    .search {
      border: 1px solid dodgerblue;
      margin: 10px;
      padding: 5px 1rem;
      border-radius: 2px;
      height: 2rem;
      font-size: 1.2rem;
    }

    .search-wrap {
      text-align: center;
    }

    .no-content {
      text-align: center;
    }
  `],
  animations: []
})
export class DetailComponent implements OnInit {
  activity$: Observable<{ name: string, date: Date }>;
  private activityIndex: number;
  peopleList$: Observable<IPeople[]>;

  constructor(
    private modal: ModalService,
    private db: NgxIndexedDBService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
  }


  ngOnInit(): void {
    this.activityIndex = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.activity$ = this.db.getByKey('activity', this.activityIndex);
    this.fetchData();
  }

  fetchData(search?: string) {
    if (!search) {
      this.peopleList$ = this.activity$.pipe(
        switchMap(id => this.db.getAllByIndex('people', 'activity', IDBKeyRange.only(this.activityIndex))));
      console.log('insearch:', search);
    } else {
      this.peopleList$ = this.peopleList$.pipe(
        tap(res => console.log('res', res)),
        map(list => list.filter(item => item.name.startsWith(search)))
      );
    }
  }

  //添加
  onRightClick() {
    const modalRef = this.modal.open(EditComponent, {'activity': this.activityIndex});
    modalRef.afterClosed$.subscribe(res => {
      const {data} = res;
      if (data) {
        this.db.add('people', data).subscribe(() => this.toast.success(`已成功添加了 ${data.name} 的记录`));
        this.ngOnInit();
      }
    });
  }

  onLeftClick() {
    this.router.navigateByUrl('/record/list');
  }

  onUpdate(people: IPeople) {
    const modalRef = this.modal.open(EditComponent, {...people});
    modalRef.afterClosed$.subscribe(res => {
      const {data} = res;
      console.log('update', data);
      if (data) {
        const {_delete, id} = data;
        //删除状态
        if (_delete) {
          this.db.delete('people', id).subscribe(() => this.toast.success(
            `已删除了该记录`, 2000
          ));
        } else {
          //更新
          this.db.update('people', data).subscribe(
            () => this.toast.success(`已更新了 ${data.name} 的记录`)
          );
        }
        this.ngOnInit();
      }
    });
  }

  handleSearch(value: string) {
    this.fetchData(value);
  }

  delete() {
    console.log('delete');
  }

  sum() {
    this.db.getByIndex('result', 'activityId', this.activityIndex).subscribe(res => {
      console.log(res);
      if (res) {
        this.router.navigate(['/record/result', res.id]);
      } else {
        this.db.add('result', {activityId: this.activityIndex}).subscribe(key => {
          this.router.navigate(['/record/result', key]);
        });
      }
    });
  }
}
