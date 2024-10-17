import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CuRoomComponent } from './cu-room/cu-room.component';
import { CQuickRoomComponent } from './c-quick-room/c-quick-room.component';

@Component({
  selector: 'app-manager-room',
  templateUrl: './manager-room.component.html',
  styleUrls: ['./manager-room.component.css']
})
export class ManagerRoomComponent {

  constructor(private modalService: NzModalService) { }

  showAddRoomModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm phòng',
      nzContent: CuRoomComponent,
      nzWidth: '700px',
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: "Thêm mới",
          type: "primary",
          onClick: () => {
            const instance = modal.getContentComponent() as CuRoomComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }


  showEditRoomModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Sửa phòng',
      nzContent: CuRoomComponent,
      nzWidth: '700px',
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: "Lưu",
          type: "primary",
          onClick: () => {
            const instance = modal.getContentComponent() as CuRoomComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }


  showAddQuickRoomModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm phòng nhanh',
      nzContent: CQuickRoomComponent,
      nzWidth: '700px',
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: "Thêm mới",
          type: "primary",
          onClick: () => {
            const instance = modal.getContentComponent() as CQuickRoomComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }

}
