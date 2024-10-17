import { Component } from '@angular/core';
import { CuBuildingServiceComponent } from './cu-building-service/cu-building-service.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-manager-building-service',
  templateUrl: './manager-building-service.component.html',
  styleUrls: ['./manager-building-service.component.css'],
})
export class ManagerBuildingServiceComponent {
  searchValue: string = '';
  selectedService: any = null;
  selectedBuildingId: string | null = '';

  buildings = [
    { id: '1', name: 'Tòa nhà A' },
    { id: '2', name: 'Tòa nhà B' },
    { id: '3', name: 'Tòa nhà C' },
  ];

  listOfData = [
    {
      id: 1,
      serviceName: 'Dịch vụ 1',
      price: 100000,
      type: 'Loại A',
      buildingId: '1',
      isDelete: false,
    },
    {
      id: 2,
      serviceName: 'Dịch vụ 2',
      price: 200000,
      type: 'Loại B',
      buildingId: '2',
      isDelete: false,
    },
    {
      id: 3,
      serviceName: 'Dịch vụ 3',
      price: 300000,
      type: 'Loại C',
      buildingId: '3',
      isDelete: true,
    },
  ];

  constructor(private modalService: NzModalService) {}

  filteredData = [...this.listOfData];

  searchData(): void {
    this.filterData();
  }

  filterByBuildingId(): void {
    this.filterData();
  }

  private filterData(): void {
    this.filteredData = this.listOfData.filter((item) => {
      const matchesBuildingId = this.selectedBuildingId
        ? item.buildingId === this.selectedBuildingId
        : true;
      const matchesSearchValue = item.serviceName
        .toLowerCase()
        .includes(this.searchValue.toLowerCase());
      return matchesBuildingId && matchesSearchValue;
    });
  }

  showEditModal(data: any): void {
    this.selectedService = data;
    const modal = this.modalService.create({
      nzTitle: 'Sửa dịch vụ',
      nzContent: CuBuildingServiceComponent,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Lưu',
          type: 'primary',
          onClick: () => {
            const instance =
              modal.getContentComponent() as CuBuildingServiceComponent;
            instance.handleOk();
          },
        },
      ],
    });

    const instance = modal.getContentComponent() as CuBuildingServiceComponent;
    instance.serviceData = { ...data };
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.saveService(result);
      }
    });
  }

  showAddModal(): void {
    this.selectedService = null;
    const modal = this.modalService.create({
      nzTitle: 'Thêm dịch vụ',
      nzContent: CuBuildingServiceComponent,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Thêm mới',
          type: 'primary',
          onClick: () => {
            const instance =
              modal.getContentComponent() as CuBuildingServiceComponent;
            instance.handleOk();
          },
        },
      ],
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.saveService(result);
      }
    });
  }

  showDeleteModal(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa dịch vụ',
      nzContent: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteService(id),
      nzCancelText: 'Hủy',
    });
  }

  // Save the service (both for new and edited services)
  saveService(serviceData: any): void {
    if (this.selectedService) {
      // Update existing service
      const index = this.listOfData.findIndex(
        (item) => item === this.selectedService
      );
      if (index !== -1) {
        this.listOfData[index] = { ...this.selectedService, ...serviceData };
      }
    } else {
      // Add new service
      this.listOfData = [...this.listOfData, serviceData];
    }

    // Update the filtered list after adding or editing
    this.filteredData = [...this.listOfData];
  }

  deleteService(id: any): void {
    this.listOfData = this.listOfData.filter((item) => item.id !== id);
    this.filteredData = [...this.listOfData];
  }
}
