import {Component, OnInit, TemplateRef, Type} from '@angular/core';
import {ModalRef} from './modal-ref';
import {style, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-content">
      <ng-container [ngSwitch]="contentType">
        <ng-container *ngSwitchCase="'string'">
          <div class="box">
            <div [innerHTML]="content"></div>
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="'template'">
        </ng-container>

        <ng-container *ngSwitchCase="'component'">
        </ng-container>
      </ng-container>
    </div>
    <!-- You can also add a global close button -->
    <button (click)="close()" class="modal-close is-large" aria-label="close"></button>
    <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
    <ng-container *ngComponentOutlet="content"></ng-container>
  `,
  styles: [`
    :host {
      /*display: block;*/
      /*position: absolute;*/
      /*top: 10%;*/
      height: 100vh;
      width: 100%;
      background-color: white;
      transform: translateY(0);
    }

    .modal-content {
      background-color: white;
      /*width: 400px;*/
    }
  `],
  animations: [
    // trigger('open', style({'transform': 'translateY(0)'})
  ]
})
export class ModalComponent implements OnInit {

  constructor(
    private ref: ModalRef
  ) {
  }

  contentType: 'template' | 'string' | 'component' = 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;

  ngOnInit() {
    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }

  close() {
    this.ref.close(null);
  }
}
