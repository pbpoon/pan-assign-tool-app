import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {RecordModule} from './record/record.module';
import {TabBarComponent} from './tab-bar/tab-bar.component';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//数据库
const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'activity',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'name', keypath: 'name', options: {unique: false}},
        {name: 'date', keypath: 'date', options: {unique: false}},
      ]
    },
    {
      store: 'people',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'activity', keypath: 'activity', options: {unique: false}},
        {name: 'name', keypath: 'name', options: {unique: false}},
        {name: 'count', keypath: 'count', options: {unique: false}},
        {name: 'tools', keypath: 'toolCount', options: {unique: false}}
      ]
    },
    {
      store: 'result',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'activityId', keypath: 'activityId', options: {unique: false}},
        {name: 'resource', keypath: 'resources', options: {unique: false}},
        {name: 'date', keypath: 'date', options: {unique: false}},
      ]
    },

  ]
};

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule,
    RecordModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
