import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalRef} from '../../shared/modal/modal-ref';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-resource',
  template: `
    <div class="container" [class.modal-active]="active">
      <div class="top">
        <div class="close" (click)="close()">X</div>
        <div class="title"></div>
        <button type="button" [disabled]="!form.valid" [class.blue]="form.valid" class="ok close" (click)="submit()">确认</button>
      </div>
      <div class="content">
        <form [formGroup]="form">

          <InputItem
            [clear]="true"
            formControlName="resource"
            [placeholder]="'输入重量'"
            [content]="'重量'"
          ></InputItem>
        </form>
        <div Button type="warning" *ngIf="id" (click)="delete()">删除</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: absolute;
      top: 10%;
      height: 90vh;
      width: 100%;
      background-color: whitesmoke;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: -100%;
    }

    .blue {
      color: dodgerblue;
    }

    .modal-active {
      bottom: 0;
    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close {
      font-size: 1.5rem;
      padding: 10px 20px;
      background-color: whitesmoke;
    }

    .ok {
      border: none;
    }

    .title {
      flex: 1 1 auto;
    }

    .content {
      flex: 1 1 auto;
      padding: 15px 8px;
      /*height: 100%;*/
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
    }

    .content form {
      flex: 1 1 auto;
    }
  `]
})
export class ResourceComponent implements OnInit {
  active = true;
  form: FormGroup;
  id: number;
  activityId: number;
  resource: number;

  constructor(
    private modal: ModalRef,
    private fb: FormBuilder,
    private db: NgxIndexedDBService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      activityId: [this.activityId, [Validators.required]],
      resource: [this.resource || 0, [Validators.required]],
    });
  }

  close() {

  }

  submit() {

  }

  delete() {

  }
}
