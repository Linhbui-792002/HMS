import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { State } from './cu-term.store.reducer';
import * as CuTermAction from './cu-term.store.action';
import { LoadingComponent } from 'src/app/common-service/loading-services/loading.component';
import { Observable, Subscription } from 'rxjs';
import {
  RegistTermInfoResponse,
  UpdateTermInfoResponse,
} from './cu-term.model';
import {
  handleError,
  registTermResponse,
  updateTermResponse,
} from './cu-term.store.selector';
import { PopupMessageService } from 'src/app/common-service/popup-message/popup-message.service';
import { error } from 'console';

@Component({
  selector: 'app-cu-term',
  templateUrl: './cu-term.component.html',
  styleUrls: ['./cu-term.component.css'],
})
export class CuTermComponent implements OnInit, OnDestroy {
  @Input() termData: any;
  termsForm!: FormGroup;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  private subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private termStore: Store<State>,
    private popupMessage: PopupMessageService
  ) {
    this.termsForm = this.fb.group({
      termName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isActive: [false],
    });
    this.stateRegistTermResponse = this.termStore.select(registTermResponse);
    this.stateUpdateTermResponse = this.termStore.select(updateTermResponse);
    this.handleError = this.termStore.select(handleError);
  }
  ngOnDestroy(): void {
    this.termStore.dispatch(CuTermAction.clearAction());
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  stateRegistTermResponse: Observable<RegistTermInfoResponse>;
  stateUpdateTermResponse: Observable<UpdateTermInfoResponse>;
  handleError: Observable<any>;

  showNotification: boolean = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage: string = '';
  ngOnInit(): void {
    console.log(this.termData, 'data được field sang');
    this.subscription.push(
      this.stateRegistTermResponse.subscribe((state) => {
        if (Object?.keys(state).length > 0) {
          console.log(state);
          setTimeout(() => {
            this.loadingComponent.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Tạo thành công';
            this.showNotification = true;
            this.modal.destroy(this.termsForm.value);
          }, 3000);
        }
      })
    );

    this.subscription.push(
      this.stateUpdateTermResponse.subscribe((state) => {
        if (Object?.keys(state).length > 0) {
          console.log(state);
          setTimeout(() => {
            this.loadingComponent.finish();
            this.notificationType = 'success';
            this.notificationMessage = 'Sửa thành công';

            this.showNotification = true;
            this.modal.destroy(this.termsForm.value);
          }, 3000);
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
    if (this.termData) {
      this.termsForm.patchValue({
        termName: this.termData.termName,
        description: this.termData.description,
        isActive: this.termData.isActive,
      });
    }
  }

  handleOk(): void {
    if (this.termsForm.valid) {
      const data = this.termsForm.value;
      console.log('Thêm mới điều khoản', this.termsForm.value);
      const payload = {
        termName: data['termName'],
        description: data['description'],
      };
      this.loadingComponent.start();
      if (this.termData) {
        Object.assign(payload, { termId: this.termData._id });
        this.termStore.dispatch(CuTermAction.updateTerm({ payload }));
      } else {
        this.termStore.dispatch(CuTermAction.registTerm({ payload }));
      }
    } else {
      // Đánh dấu các trường đã bị dirty
      Object.values(this.termsForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
