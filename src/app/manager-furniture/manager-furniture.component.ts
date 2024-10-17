import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CuFurnituresComponent } from './cu-furnitures/cu-furnitures.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import {
  DeleteFurnituresResponse,
  InitFurnituresResponse,
} from './manager-furnitures.model';
import { Store } from '@ngrx/store';
import { State } from './manager-furnitures.store.reducer';
import {
  deleteFurnituresResponse,
  handleError,
  initFurnituresResponse,
} from './manager-furnitures.store.selector';
import * as FurnituresActions from './manager-furnitures.store.action';
import { LoadingComponent } from '../common-service/loading-services/loading.component';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-manager-furniture-ui',
  templateUrl: './manager-furniture.component.html',
  styleUrls: ['./manager-furniture.component.css'],
})
export class ManagerFurnituresComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  searchValue: string = '';
  selectedFurniture: any = null;
  selectedBuildingId: string | null = ''; // Thêm biến để lưu buildingId đã chọn
  showNotification: boolean = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage: string = '';

  options = {
    pageSize: 10, // Số bản ghi trên mỗi trang (cố định)
    pageIndex: 1, // Trang hiện tại
    totalRecords: 100, // Tổng số bản ghi
  };

  onPageIndexChange(pageIndex: number): void {
    // this.options.pageIndex = pageIndex;
    const payload = {
      buildingId: '67090216b2dace07a3a1fa2a',
      options: { page: pageIndex },
    };
    this.furnituresStore.dispatch(
      FurnituresActions.initFurnitures({ payload })
    );
  }

  // Ví dụ danh sách tòa nhà
  buildings = [
    { id: '1', name: 'Tòa nhà A' },
    { id: '2', name: 'Tòa nhà B' },
    { id: '3', name: 'Tòa nhà C' },
  ];

  listOfData = [
    {
      id: 1,
      name: 'Bàn làm việc',
      quantity: 10,
      price: 1500000,
      buildingId: '1', // Thêm buildingId
      isDelete: false,
    },
    {
      id: 2,
      name: 'Ghế xoay',
      quantity: 5,
      price: 800000,
      buildingId: '2', // Thêm buildingId
      isDelete: false,
    },
    {
      id: 3,
      name: 'Giường ngủ',
      quantity: 2,
      price: 3000000,
      buildingId: '3', // Thêm buildingId
      isDelete: true,
    },
  ];
  private subscription: Subscription[] = [];

  constructor(
    private modalService: NzModalService,
    private furnituresStore: Store<State>,
    private cdr: ChangeDetectorRef
  ) {
    {
      this.stateInitFurnituresResponse = this.furnituresStore.select(
        initFurnituresResponse
      );
      this.stateDeleteFurnituresResponse = this.furnituresStore.select(
        deleteFurnituresResponse
      );
      this.handleError = this.furnituresStore.select(handleError);
    }
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngOnDestroy(): void {
    this.furnituresStore.dispatch(FurnituresActions.clearAction());
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  stateInitFurnituresResponse: Observable<any>;
  initFurnituresResponse: any;
  rootInitFurnituresResponse: any;
  stateDeleteFurnituresResponse: Observable<DeleteFurnituresResponse>;
  handleError: Observable<any>;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;

  ngOnInit(): void {
    const payload = {
      buildingId: '67090216b2dace07a3a1fa2a',
      options: { page: this.options.pageIndex },
    };
    this.furnituresStore.dispatch(
      FurnituresActions.initFurnitures({ payload })
    );

    this.subscription.push(
      this.stateInitFurnituresResponse.subscribe((state) => {
        if (Object.keys(state).length > 0) {
          setTimeout(() => {
            this.loadingComponent.finish();
            this.rootInitFurnituresResponse = cloneDeep(state.metadata);
            this.initFurnituresResponse = state.metadata;
            this.options.totalRecords = state.metadata.totalRecords;
          }, 1000);
        }
      })
    );
    this.subscription.push(
      this.stateDeleteFurnituresResponse.subscribe((state) => {
        if (Object.keys(state).length > 0) {
          setTimeout(async () => {
            this.loadingComponent.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Xóa thành công!';
            this.showNotification = true;
            const payload = {
              buildingId: '67090216b2dace07a3a1fa2a',
            };
            this.loadingComponent.start();
            this.furnituresStore.dispatch(
              FurnituresActions.initFurnitures({ payload })
            );
          }, 1000);
        }
      })
    );
    this.subscription.push(
      this.handleError.subscribe((message) => {
        if (message) {
          setTimeout(() => {
            this.loadingComponent.finish();
            this.notificationType = 'error';
            this.notificationMessage = message;
            this.showNotification = true;
          }, 1000);
        }
      })
    );
  }

  filteredData = [...this.listOfData];

  // Search functionality
  searchData(): void {
    this.filterData();
  }

  // Filter by buildingId
  filterByBuildingId(): void {
    this.filterData();
  }

  // Hàm lọc dữ liệu
  private filterData(): void {
    this.filteredData = this.listOfData.filter((item) => {
      const matchesBuildingId = this.selectedBuildingId
        ? item.buildingId === this.selectedBuildingId
        : true;
      const matchesSearchValue = item.name
        .toLowerCase()
        .includes(this.searchValue.toLowerCase());
      return matchesBuildingId && matchesSearchValue;
    });
  }

  showEditModal(furniture: any): void {
    this.selectedFurniture = furniture;
    const modal = this.modalService.create({
      nzTitle: 'Chỉnh sửa nội thất',
      nzContent: CuFurnituresComponent,
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
              modal.getContentComponent() as CuFurnituresComponent;
            instance.handleOk();
          },
        },
      ],
    });

    const instance = modal.getContentComponent() as CuFurnituresComponent;
    instance.furnitureData = { ...furniture };
    modal.afterClose.subscribe((result) => {
      if (result) {
        const payload = {
          buildingId: '67090216b2dace07a3a1fa2a',
        };
        this.loadingComponent.start();
        this.furnituresStore.dispatch(
          FurnituresActions.initFurnitures({ payload })
        );
      }
    });
  }

  showAddModal(): void {
    this.selectedFurniture = null;
    const modal = this.modalService.create({
      nzTitle: 'Thêm nội thất',
      nzContent: CuFurnituresComponent,
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
              modal.getContentComponent() as CuFurnituresComponent;
            instance.handleOk();
          },
        },
      ],
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        const payload = {
          buildingId: '67090216b2dace07a3a1fa2a',
        };
        this.loadingComponent.start();
        this.furnituresStore.dispatch(
          FurnituresActions.initFurnitures({ payload })
        );
      }
    });
  }

  showDeleteModal(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa nội thất',
      nzContent: 'Bạn có chắc chắn muốn xóa nội thất này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteFurniture(id),
      nzCancelText: 'Hủy',
    });
  }

  // Save the furniture (both for new and edited furniture)
  saveFurniture(furnitureData: any): void {
    if (this.selectedFurniture) {
      // Update existing furniture
      const index = this.listOfData.findIndex(
        (item) => item === this.selectedFurniture
      );
      if (index !== -1) {
        this.listOfData[index] = {
          ...this.selectedFurniture,
          ...furnitureData,
        };
      }
    } else {
      // Add new furniture
      this.listOfData = [...this.listOfData, furnitureData];
    }

    // Update the filtered list after adding or editing
    this.filteredData = [...this.listOfData];
  }

  // Delete a furniture from the list
  deleteFurniture(id: any): void {
    // this.listOfData = this.listOfData.filter((item) => item.id !== id);
    // this.filteredData = [...this.listOfData];
    this.loadingComponent.start();
    const payload = { _id: id };
    this.furnituresStore.dispatch(
      FurnituresActions.deleteFurnitures({ payload })
    );
  }
}
