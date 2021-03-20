import {Component, OnInit} from '@angular/core';
import {ModalRef} from '../../shared/modal/modal-ref';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {NgxIndexedDBService} from 'ngx-indexed-db';

@Component({
  selector: 'app-edit',
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
            formControlName="name"
            [placeholder]="'输入家庭名称'"
            [content]="'出席家庭名称'"
          ></InputItem>
          <br>
          <InputItem
            [clear]="true"
            type="number"
            formControlName="count"
            [placeholder]="'出席人数'"
            [content]="'出席人数'"
          ></InputItem>
          <InputItem
            [clear]="true"
            formControlName="tools"
            type="number"
            [placeholder]="'工具数量'"
            [content]="'工具数'"
          ></InputItem>
        </form>
        <div Button type="warning" *ngIf="id" (click)="delete()">删除</div>
        <!--        {{form.valid}}-->
        <!--        {{form.touched}}-->
        <!--        {{form.dirty}}-->
        <!--        {{form.value|json}}-->
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
export class EditComponent implements OnInit {
  active = false;
  form!: FormGroup;
  activity: number;
  name: string;
  count: number;
  tools: number;
  id: number;

  constructor(
    private overlayRef: ModalRef,
    private nzModal: ModalService,
    private fb: FormBuilder,
    private db: NgxIndexedDBService,
    private toastService: ToastService
  ) {
    const {data} = this.overlayRef;
    console.log('initial', data);
    Object.assign(this, data);
  }

  ngOnInit(): void {
    this.active = true;
    this.form = this.fb.group({
      activity: [this.activity, [Validators.required]],
      name: [this.name || '', [Validators.required]],
      count: [this.count || null, [Validators.required]],
      tools: [this.tools || null,]
    });
  }

  close() {
    this.overlayRef.close();
  }

  submit() {
    let data = {...this.form.value};
    if (this.id) {
      data = {...data, id: this.id};
    }
    // console.log({data});
    this.db.getByIndex('people', 'name', data.name).subscribe(res => {
      // console.log(res);
      if (res && !this.id) {
        this.toastService.fail(`名称为:${data.name} 的记录已存在!`);
      } else {
        this.overlayRef.close(data);
      }
      console.log({data});
    });
  }

  delete() {
    this.nzModal.alert('删除', '确认删除?', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '删除', onPress: () =>
          this.overlayRef.close({id: this.id, _delete: true})
      }
    ]);
  }
}
