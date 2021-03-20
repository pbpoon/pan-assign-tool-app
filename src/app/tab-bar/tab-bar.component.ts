import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ITabBarItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-tab-bar',
  template: `
    <div class="tab-bar">
      <a class="tab-bar-item" *ngFor="let item of items; let idx= index" (click)="onClick(item,idx)"
         [class.active]="selectIndex===idx"
      >{{item.title}}</a>
    </div>
  `,
  styles: [
    `
      :host {
        /*z-index: 99;*/
        /*position: fixed;*/
        /*bottom: 0;*/
        width: 100%;
      }

      .tab-bar {
        background-color: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        height: 60px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 1fr);
        grid-auto-flow: column;
        grid-gap: 10px;
        justify-items: center;
        align-items: center;
        place-items: center;
      }

      .tab-bar-item {
        cursor: pointer;
        width: 55px;
        height: 55px;
        /*background-color: dodgerblue;*/
        color: grey;
        text-align: center;
        line-height: 55px;
        font-size: 1.2rem;
        font-weight: bold;
      }

      .active {
        color: dodgerblue;
      }
    `
  ]
})
export class TabBarComponent implements OnInit {
  @Input() selectIndex: number = 0;
  @Input() items: ITabBarItem[];
  @Output() handlerSelect: EventEmitter<ITabBarItem> = new EventEmitter<ITabBarItem>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(item: ITabBarItem, idx: number) {
    this.selectIndex = idx;
    this.handlerSelect.emit(item);
  }
}
