import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './record/list/list.component';
import {DetailComponent} from './record/detail/detail.component';
import {ResultComponent} from './record/result/result.component';

const routes: Routes = [
  {
    path: 'record', component: RecordComponent, children: [
      {path: 'list', component: ListComponent},
      {path: 'detail/:id', component: DetailComponent},
      {path: 'result/:id', component: ResultComponent},
      {path: '', redirectTo: 'list', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'record', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
