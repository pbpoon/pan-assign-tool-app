import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  template: `
    <ul class="top-bar">
      <li class="top-bar-left" (click)="onLeft()">
        <nzm-icon type="left"></nzm-icon>
      </li>
      <li class="top-bar-title">
        <ng-content>
        </ng-content>
      </li>
      <li class="top-bar-right">
        <div (click)="onRight()">{{rightButtonName ? rightButtonName : '添加+'}}</div>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      position: fixed;
      width: 100%;
      z-index: 2;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      background-color: dodgerblue;
      height: 3rem;
      color: white;
      padding: 0 10px;
      font-weight: bold;
      font-size: 1rem;
    }

    .top-bar-title {
      flex: 1 1 auto;
    }
  `]
})
export class TopBarComponent implements OnInit {
  @Input() rightButtonName: string;
  @Output() handlerRightClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() handlerLeftClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRight() {
    this.handlerRightClick.emit();
  }


  onLeft() {
    this.handlerLeftClick.emit();
  }
}
