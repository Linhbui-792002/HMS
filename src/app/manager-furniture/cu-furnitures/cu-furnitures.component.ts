import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  RegistFurnituresPayload,
  RegistFurnituresResponse,
  UpdateFurnituresResponse,
} from './cu-furnitures.model';
import { Observable, Subscription } from 'rxjs';
import { State } from './cu-furnitures.store.reducer';
import { Store } from '@ngrx/store';
import {
  handleError,
  registFurnituresResponse,
  updateFurnituresResponse,
} from './cu-furnitures.store.selector';
import { LoadingComponent } from 'src/app/common-service/loading-services/loading.component';
import * as CuTermAction from './cu-furnitures.store.action';

@Component({
  selector: 'app-cu-funiture-ui',
  templateUrl: './cu-furnitures.component.html',
  styleUrls: ['./cu-furnitures.component.css'],
})
export class CuFurnituresComponent implements OnInit, OnDestroy {
  @Input() furnitureData: any;
  furnitureForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private furnituresStore: Store<State>
  ) {
    this.stateRegistFurnituresResponse = this.furnituresStore.select(
      registFurnituresResponse
    );
    this.stateUpdateFurnituresResponse = this.furnituresStore.select(
      updateFurnituresResponse
    );
    this.handleError = this.furnituresStore.select(handleError);

    this.furnitureForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      isDelete: [false],
    });
  }
  ngOnDestroy(): void {
    this.furnituresStore.dispatch(CuTermAction.clearAction());
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  stateRegistFurnituresResponse: Observable<RegistFurnituresResponse>;
  stateUpdateFurnituresResponse: Observable<UpdateFurnituresResponse>;
  handleError: Observable<any>;
  private subscription: Subscription[] = [];
  showNotification: boolean = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage: string = '';
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;

  ngOnInit(): void {
    if (this.furnitureData) {
      this.furnitureForm.patchValue({
        name: this.furnitureData.name,
        quantity: this.furnitureData.quantity,
        price: this.furnitureData.price,
        isDelete: this.furnitureData.isDelete,
      });
    }
    this.subscription.push(
      this.stateRegistFurnituresResponse.subscribe(async (state) => {
        if (Object.keys(state).length > 0) {
          console.log(state);
          setTimeout(async () => {
            this.loadingComponent.finish();
            this.loadingComponent.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Thêm thành công!';
            this.showNotification = true;
            this.modal.destroy(this.furnitureForm.value);
          }, 1000);
        }
      })
    );
    this.subscription.push(
      this.stateUpdateFurnituresResponse.subscribe(async (state) => {
        if (Object.keys(state).length > 0) {
          console.log(state);
          setTimeout(async () => {
            this.loadingComponent.finish();
            this.loadingComponent.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Sửa thành công!';
            this.showNotification = true;
            this.modal.destroy(this.furnitureForm.value);
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

  handleOk(): void {
    if (this.furnitureForm.valid) {
      const data = this.furnitureForm.value;
      const payload: RegistFurnituresPayload = {
        buildingId: '67090216b2dace07a3a1fa2a',
        name: data.name,
        quantity: data.quantity,
        price: data.price,
      };
      if (this.furnitureData) {
        this.loadingComponent.start();

        Object.assign(payload, {
          // createdBy: this.furnitureData.createdBy,
          _id: this.furnitureData._id,
        });
        this.furnituresStore.dispatch(
          CuTermAction.updateFurniture({ payload })
        );
      } else {
        this.loadingComponent.start();
        this.furnituresStore.dispatch(
          CuTermAction.registFurnitures({ payload })
        );
      }
    } else {
      // Đánh dấu các trường đã bị dirty
      Object.values(this.furnitureForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
