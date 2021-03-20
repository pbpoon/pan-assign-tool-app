import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ModalRef} from './modal-ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ModalComponent} from './modal.component';
import {EditComponent} from '../../record/edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) {
  }

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>, data: T): ModalRef<R> {
    const strategy = this.overlay
      .position()
      .global();
    // .centerVertically();
    // .centerHorizontally('10 %');
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: strategy
    });

    const overlayRef = this.overlay.create(configs);
    const myOverlayRef = new ModalRef<R, T>(overlayRef, content, data);
    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(EditComponent, null, injector));
    return myOverlayRef;
  }

  createInjector(ref: ModalRef, inj: Injector) {
    const injectorTokens = new WeakMap([[ModalRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}
