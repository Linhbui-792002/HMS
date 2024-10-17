import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
// import { ModalService } from '../modal/modal.service';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css'],
})
export class PopupMessageComponent implements OnInit {
  @Input() data!: {
    title: string;
    message: string;
    type: string;
  };
  title: string = '';
  message: string = '';
  type!: string;

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  // constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title || 'LỖI';
      this.message = this.data.message || 'Không tìm thấy thông báo nào.';
      this.type = this.data.type || 'success'; // Lấy type từ data
    }
  }

  onConfirm(): void {
    this.confirm.emit();
    // this.activeModal.close(true);
  }

  onClose(): void {
    // this.activeModal.close(false);
  }
}
