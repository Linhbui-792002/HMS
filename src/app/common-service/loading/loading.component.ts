import { Injectable } from "@angular/core";
// import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { SpinnerComponent } from "../spinner/spinner.component"; 
// import { ModalService } from "../modal/modal.service";

@Injectable({
  providedIn: `root`,
})
export class LoadingService {
  // cnt: number = 0;
  // modalRef: NgbModalRef | undefined;
  // constructor(private modal: ModalService) {}
  // start() {
  //   this.cnt++;
  //   if (this.modalRef !== undefined) {
  //     // 2つ目以降のモーダルは開かない
  //     return;
  //   }
  //   this.modalRef = this.modal.open(SpinnerComponent);
  // }
  // finish() {
  //   this.cnt--;
  //   if (this.cnt < 1) {
  //     if (this.modalRef !== undefined) {
  //       this.modalRef.dismiss();
  //       this.modalRef = undefined;
  //     }
  //     this.cnt = 0;
  //   }
  // }
}