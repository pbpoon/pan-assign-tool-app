import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {ModalService} from '../../shared';
import {ResourceComponent} from '../resource/resource.component';
import {IPeople} from '../detail/detail.component';
import {map, mergeMap, reduce, tap} from 'rxjs/operators';
import {from} from 'rxjs';

@Component({
  selector: 'app-result',
  template: `
    <app-top-bar rightButtonName="添加数据" (handlerLeftClick)="onLeftClick()" (handlerRightClick)="onRightClick()">
    </app-top-bar>
    <div class="paddingTop"></div>
    <ng-container *ngIf="total">
      <div>
        <h3>出席户数:{{total.length}}</h3>
        <h3>出席人数:{{total.count}}</h3>
        <h3>工具数:{{total.tools}}</h3>
        <h1>总份额:{{total.total}}</h1>
      </div>
    </ng-container>
  `,
  styles: []
})
export class ResultComponent implements OnInit {
  id: number;
  activityId: number;
  peopleList: IPeople[] = [];
  total: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: NgxIndexedDBService,
    private modal: ModalService
  ) {
  }

  ngOnInit(): void {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('id', this.id);
    this.db.getByKey('result', this.id).pipe(
      tap(res => this.activityId = res.activityId),
      mergeMap(res => this.db.getAllByIndex('people', 'activity', IDBKeyRange.only(res.activityId))),
      tap(res => this.peopleList = res),
      mergeMap(res => from(res)),
      reduce((acc, value, index) => {
        const count = acc.count + Number.parseInt(value.count) || 0;
        const tools = acc.tools + Number.parseInt(value.tools) || 0;
        const total = acc.total + count + tools * 0.5;
        const length = index;
        return {count, tools, total, length};
      }, {count: 0, tools: 0, total: 0, length: 0})
    ).subscribe(res => this.total = res);
    // this.db.getByKey('result', this.id).subscribe(res => {
    //   this.activityId = Number.parseInt(res.activityId);
    //   this.db.getAllByIndex('people', 'activity', IDBKeyRange.only(this.activityId)).subscribe(res => {
    //     this.peopleList = res;
    //     console.table(res);
    //     let tools = 0;
    //     let count = 0;
    //     let count = res.reduce((acc, cur) => acc + Number.parseInt(cur.count) || 0, 0);
    // for (const r of res) {
    //   console.log(r.tools);
    //   tools += Number.parseInt(r.tools) || 0;
    //   count += Number.parseInt(r.count) || 0;
    // }
    // let length = res.length;
    // let tools = res.reduce((acc, cur) => acc + Number.parseInt(cur.tools) || 0, 0);
    // this.total = {count, tools, total: count + tools * 0.5, length};
    // });
    // });
  }

  onLeftClick() {
    this.router.navigateByUrl('/record/detail/' + this.activityId);
  }

  onRightClick() {
    const modalRef = this.modal.open(ResourceComponent, {id: this.id, activityId: this.activityId});
    modalRef.afterClosed$.subscribe(console.log);
  }
}
