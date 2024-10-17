import { Injectable } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { PopupMessageComponent } from './popup-message.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
// import { ModalService } from '../modal/modal.service';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  constructor(
    // private modalService: ModalService,
    // private activeModal: NgbActiveModal,
    // private modal: NgbModal
    private modal: NzModalService
  ) {}

  async confirm(data: { title: string; message: string }) {
    let _result = false;
    const payload = { ...data, type: 'confirm' };
    const response = this.modal.create({ nzContent: PopupMessageComponent });
    response.afterClose.subscribe((result) => {
      if (result) {
        _result = result;
        console.log('Received from modal:', result);
      }
    });
    // response.componentInstance.data = payload;
    // await response.result.then((result) => {
    //   _result = result;
    // });

    return _result;
  }

  async notice(data: { title: string; message: string }) {
    // const payload = { ...data, type: 'notification' };
    // const response = this.modal.open(PopupMessageComponent, {
    //   backdrop: 'static',
    //   size: 'lg',
    // });
    // response.componentInstance.data = payload;
    // await response.result.then((result) => {
    //   return true;
    // });
  }

  async error(data: { title: string; message: string }) {
    // const payload = { ...data, type: 'error' };
    // const response = this.modal.open(PopupMessageComponent, {
    //   backdrop: 'static',
    //   size: 'lg',
    // });
    // response.componentInstance.data = payload;
    // await response.result.then((result) => {
    //   return true;
    // });
  }

  async success(data: { title: string; message: string }) {
    // const payload = { ...data, type: 'success' };
    // const response = this.modal.open(PopupMessageComponent, {
    //   backdrop: 'static',
    //   size: 'lg',
    // });
    // response.componentInstance.data = payload;
    // await response.result.then((result) => {
    //   return true;
    // });
  }
}
