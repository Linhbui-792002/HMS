// import { Injectable } from '@angular/core';
// // import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from './modal.component';

// @Injectable({
//   providedIn: 'root',
// })
// export class ModalService {
//   // private modalRef: NgbModalRef | undefined;

//   constructor(private modalService: NgbModal) {}

//   open(component: any, data: any = null, options: any = {}): any {
//     this.modalRef = this.modalService.open(component, {
//       size: options.size || 'lg',
//       backdrop: options.backdrop || 'static',
//     });
//     this.modalRef.componentInstance.contentComponent = component;
//     this.modalRef.componentInstance.data = data;

//     return this.modalRef;
//   }


//   close(result?: any): void {
//     if (this.modalRef) {
//       this.modalRef.close(result);
//     }
//   }

//   dismiss() {
//     if (this.modalRef) {
//       this.modalRef.dismiss();
//     }
//   }
// }
