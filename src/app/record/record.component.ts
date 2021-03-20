import {Component, OnInit} from '@angular/core';
import {ModalService} from 'ng-zorro-antd-mobile';
import {NgxIndexedDBService} from 'ngx-indexed-db';

@Component({
  selector: 'app-record',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    .padding {
      margin-bottom: 60px;
    }
  `]
})
export class RecordComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
