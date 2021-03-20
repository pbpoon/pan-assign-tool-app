import {NgModule} from '@angular/core';
import {RecordComponent} from './record.component';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {DetailComponent} from './detail/detail.component';
import {EditComponent} from './edit/edit.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ReactiveFormsModule} from '@angular/forms';
import {ResultComponent} from './result/result.component';
import {ResourceComponent} from './resource/resource.component';


@NgModule({
  declarations: [RecordComponent, ListComponent, DetailComponent, EditComponent, ResultComponent, ResourceComponent],
  imports: [
    RouterModule,
    SharedModule,
    ScrollingModule,
  ],
  entryComponents: [EditComponent, ResourceComponent]

})
export class RecordModule {
}
