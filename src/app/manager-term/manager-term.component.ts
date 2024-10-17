import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CuTermComponent } from './cu-term/cu-term.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { InitTermInfoResponse } from './manager-term.model';
import { Store } from '@ngrx/store';
import { State } from './manager-term.store.reducer';
import {
  deleteTermResponse,
  handleError,
  initTermResponse,
} from './manager-term.store.selector';
import * as TermAction from './manager-term.store.action';
import { LoadingComponent } from '../common-service/loading-services/loading.component';

@Component({
  selector: 'app-manager-term',
  templateUrl: './manager-term.component.html',
  styleUrls: ['./manager-term.component.css'],
})
export class ManagerTermComponent implements OnInit, AfterViewInit {
  searchValue: string = '';
  selectedTerm: any = null;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  handleError: Observable<any>;
  showNotification: boolean = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage: string = '';
  listOfData = [
    {
      id: 1,
      termName: 'điều 1',
      description: 'chi tiết 1',
      isActive: true,
    },
    {
      id: 2,
      termName: 'điều 2',
      description: 'chi tiết 2',
      isActive: true,
    },
    {
      id: 3,
      termName: 'điều 3',
      description: 'chi tiết 3',
      isActive: false,
    },
  ];
  initTermRoot: any;

  constructor(
    private modalService: NzModalService,
    private termStore: Store<State>,
    private cdr: ChangeDetectorRef
  ) {
    this.stateInitTermResponse = this.termStore.select(initTermResponse);
    this.stateDeleteTermResponse = this.termStore.select(deleteTermResponse);
    this.handleError = this.termStore.select(handleError);
  }

  initTermResponse: any = [];
  subscription: Subscription[] = [];
  stateInitTermResponse: Observable<InitTermInfoResponse>;
  stateDeleteTermResponse: Observable<any>;
  ngOnInit(): void {
    console.log('ngOnInit');
    const payload = {};
    this.termStore.dispatch(TermAction.initTermInfo({ payload }));
    this.subscription.push(
      this.stateInitTermResponse.subscribe((state) => {
        if (Object.keys(state).length > 0) {
          setTimeout(() => {
            this.loadingComponent?.finish();
            this.initTermResponse = state;
            this.initTermRoot = state;
          }, 1000);
        }
      })
    );

    this.subscription.push(
      this.stateDeleteTermResponse.subscribe((state) => {
        if (Object.keys(state).length > 0) {
          setTimeout(() => {
            this.loadingComponent?.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Xóa thành công!';
            this.showNotification = true;
            const payload = {};
            this.loadingComponent.start();
            this.termStore.dispatch(TermAction.initTermInfo({ payload }));
          }, 2000);
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
          }, 3000);
        }
      })
    );
  }

  filteredData = [...this.listOfData];

  // Search functionality
  searchData(): void {
    // this.filteredData = this.listOfData.filter((item) =>
    //   item.termName.toLowerCase().includes(this.searchValue.toLowerCase())
    // );

    if (this.searchValue) {
      this.initTermResponse = this.initTermRoot.filter((item) =>
        this.removeDiacritics(item.termName?.toLowerCase()).includes(
          this.searchValue.toLowerCase()
        )
      );
    } else {
      this.initTermResponse = this.initTermRoot;
    }
  }
  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  showEditModal(data: any): void {
    this.selectedTerm = data;
    const modal = this.modalService.create({
      nzTitle: 'Sửa điều khoản',
      nzContent: CuTermComponent,
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
            const instance = modal.getContentComponent() as CuTermComponent;
            instance.handleOk();
          },
        },
      ],
    });

    const instance = modal.getContentComponent() as CuTermComponent;
    instance.termData = { ...data };
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.loadingComponent.start();
        const payload = {};
        console.log(result);
        this.termStore.dispatch(TermAction.initTermInfo({ payload }));
      }
    });
  }

  showAddModal(): void {
    this.selectedTerm = null;
    const modal = this.modalService.create({
      nzTitle: 'Thêm điều khoản',
      nzContent: CuTermComponent,
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
            const instance = modal.getContentComponent() as CuTermComponent;
            instance.handleOk();
          },
        },
      ],
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.loadingComponent.start();
        const payload = {};
        console.log(result);
        this.termStore.dispatch(TermAction.initTermInfo({ payload }));
      }
    });
  }

  showDeleteModal(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa điều khoản',
      nzContent: 'Bạn có chắc chắn muốn xóa điều khoản này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteTerm(id),
      nzCancelText: 'Hủy',
    });
  }

  // Save the term (both for new and edited terms)
  saveTerm(termData: any): void {
    if (this.selectedTerm) {
      // Update existing term
      const index = this.listOfData.findIndex(
        (item) => item === this.selectedTerm
      );
      if (index !== -1) {
        this.listOfData[index] = { ...this.selectedTerm, ...termData };
      }
    } else {
      // Add new term
      this.listOfData = [...this.listOfData, termData];
    }

    // Update the filtered list after adding or editing
    this.filteredData = [...this.listOfData];
  }

  // Delete a term from the list
  deleteTerm(id: any): void {
    this.loadingComponent.start();
    const payload = { termId: id };
    this.termStore.dispatch(TermAction.deleteTermInfo({ payload }));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
}
