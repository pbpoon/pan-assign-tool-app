import {Component} from '@angular/core';
import {TabBarOnPressEvent} from 'ng-zorro-antd-mobile';
import {Router} from '@angular/router';
import {ITabBarItem} from './tab-bar/tab-bar.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="main">
      <router-outlet></router-outlet>
    </div>
    <app-tab-bar [items]="items" (handlerSelect)="handlerSelect($event)"></app-tab-bar>
  `,
  styles: [`
    :host {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .main {
      flex: 1 1 auto;
      overflow-y: scroll;
    }

  `]
})
export class AppComponent {
  title = 'pan-assign-tool-app';
  hidden = false;
  items: ITabBarItem[] = [
    // {title: '首页', link: '/'},
    {title: '记录', link: 'record'},
  ];

  constructor(
    private router: Router
  ) {
    this.onClick();
  }

  tabBarTabOnPress(ev: TabBarOnPressEvent) {
    console.log(ev);
    this.router.navigateByUrl(`/${ev.key}`);
  }

  onClick() {
    console.log('cilck');
  }

  handlerSelect(item: ITabBarItem) {
    this.router.navigateByUrl(item.link);
  }
}
