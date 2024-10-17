import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-manager-contact',
  templateUrl: './manager-contact.component.html',
  styleUrls: ['./manager-contact.component.css'],
})
export class ManagerContactComponent {
  searchValue: string = '';
  selectedContact: any = null;

  listOfData = [
    {
      id: 1,
      content: 'Liên hệ 1',
      status: 'Đã liên hệ',
    },
    {
      id: 2,
      content: 'Liên hệ 2',
      status: 'Đã liên hệ',
    },
    {
      id: 3,
      content: 'Liên hệ 3',
      status: 'Chưa liên hệ',
    },
  ];

  constructor(private modalService: NzModalService) {}

  filteredData = [...this.listOfData];

  searchData(): void {
    this.filteredData = this.listOfData.filter((item) =>
      item.content.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  showDeleteModal(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa liên hệ',
      nzContent: 'Bạn có chắc chắn muốn xóa liên hệ này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteContact(id),
      nzCancelText: 'Hủy',
    });
  }

  deleteContact(id: any): void {
    this.listOfData = this.listOfData.filter((item) => item.id !== id);
    this.filteredData = [...this.listOfData];
  }

  showModalChangeStatus(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận thay đổi trạng thái',
      nzContent: 'Bạn có chắc chắn muốn thay đổi trạng thái của liên hệ này?',
      nzOkText: 'Thay đổi',
      nzOkType: 'primary',
      nzOnOk: () => this.changeStatus(id),
      nzCancelText: 'Hủy',
    });
  }

  changeStatus(id: any): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.listOfData[index] = {
        ...this.listOfData[index],
        status:
          this.listOfData[index].status === 'Chưa liên hệ'
            ? 'Đã liên hệ'
            : 'Chưa liên hệ',
      };
    }
    this.filteredData = [...this.listOfData];
  }

  showModalDetail(id: any): void {
    this.selectedContact = this.listOfData.find((item) => item.id === id);
    this.modalService.create({
      nzTitle: 'Chi tiết liên hệ',
      nzContent: `
        <p><b>Nội dung:</b> ${this.selectedContact.content}</p>
        <p><b>Trạng thái:</b> ${this.selectedContact.status}</p>
        `,
      nzFooter: null,
    });
  }
}
