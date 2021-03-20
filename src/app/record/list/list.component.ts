import {Component, OnInit} from '@angular/core';
import {ModalService} from 'ng-zorro-antd-mobile';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  template: `
    <app-top-bar (handlerRightClick)="onRightClick()"></app-top-bar>
    <div class="paddingTop"></div>
    <List [className]="'my-list'">
      <ListItem multipleLine [arrow]="'horizontal'"
                [routerLink]="['/record/detail/', activity.id]"
                *ngFor="let activity of activityList$|async"
                (onClick)="onClick()">
        {{activity.name}}
        <Brief>{{activity.date|date:'YYYY年-MM月-dd日'}}</Brief>
      </ListItem>
    </List>
  `
})
export class ListComponent implements OnInit {
  items = new Array(10).fill(0).map((_, i) => i);
  activityList$: Observable<any>;


  constructor(
    private modal: ModalService,
    private db: NgxIndexedDBService
  ) {
    console.log(this.items);
  }

  ngOnInit(): void {
    this.activityList$ = this.db.getAll('activity');
  }

  onClick() {

  }

  onRightClick() {

    this.modal.prompt(
      '新建活动',
      '输入活动标题',
      [{text: '取消'}, {text: '提交', onPress: value => this.add(value)}],
    );
  }

  add(value) {
    this.db.add('activity', {
      name: value,
      date: new Date()
    }).subscribe(() => {
      this.activityList$ = this.db.getAll('activity');
    });
  }
}
