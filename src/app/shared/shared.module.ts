import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ModalComponent} from './modal/modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const COMPONENTS = [TopBarComponent];
const M = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdMobileModule,
];

@NgModule({
  declarations: [...COMPONENTS, ModalComponent],
  imports: [
    ...M
  ],
  exports: [...COMPONENTS, ...M],
  entryComponents: [ModalComponent]
})
export class SharedModule {
}
