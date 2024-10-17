import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CuBuildingComponent } from './cu-building/cu-building.component';
import { CQuickBuildingComponent } from './c-quick-building/c-quick-building.component';

@Component({
  selector: 'app-manager-building',
  templateUrl: './manager-building.component.html',
  styleUrls: ['./manager-building.component.css'],
})
export class ManagerBuildingComponent {
  radioValue = 'A';
  isEmptyData = false

  constructor(private modalService: NzModalService) { }

  showAddBuildingModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm toà nhà',
      nzContent: CuBuildingComponent,
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
            const instance = modal.getContentComponent() as CuBuildingComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }

  showCreateQuickBuildingModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Tạo nhanh toà nhà',
      nzContent: CQuickBuildingComponent,
      nzWidth: '700px',
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: "Tạo nhanh",
          type: "primary",
          onClick: () => {
            const instance = modal.getContentComponent() as CQuickBuildingComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }

  showEditBuildingModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Sửa toà nhà',
      nzContent: CuBuildingComponent,
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
            const instance = modal.getContentComponent() as CuBuildingComponent;
            instance.submitForm()
          }
        }
      ]

    });
  }
}
