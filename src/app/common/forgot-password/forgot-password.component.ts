import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from './forgot-password.store.reducer';
import * as ForgotPasswordActions from './forgot-password.store.action'
import { Observable, Subscription } from 'rxjs';
import { SendPasswordFailureResponse, SendPasswordSuccessResponse } from './forgot-password.store.selector';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isVisible = false;
  forgotPasswordForm: FormGroup;
  private readonly subscription: Subscription[] = [];
  stateSendPasswordSuccessResponse: Observable<any>
  stateSendPasswordFailureResponse: Observable<any>
  showNotification = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage = ""
  @Output() requestOpenModal = new EventEmitter<void>();
  constructor(private fb: FormBuilder,
    private readonly store: Store<State>,
  ) {
    // Khởi tạo form với các validators
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Validator cho email
    });

    this.stateSendPasswordSuccessResponse = this.store.select(SendPasswordSuccessResponse);
    this.stateSendPasswordFailureResponse = this.store.select(SendPasswordFailureResponse);
  }


  ngOnInit(): void {
    this.handleSendPasswordSuccessResponse()
    this.handleSendPasswordFailureResponse()
  }

  private handleSendPasswordSuccessResponse() {
    this.subscription.push(
      this.stateSendPasswordSuccessResponse.subscribe(state => {
        if(state) {
          // popup message send password thanh cong
          this.showNotification = true;
          this.notificationType = 'success';
          this.notificationMessage = 'Gửi mật khẩu thành công';
          setTimeout(() => {
            this.handleOk();
          }, 1000);
        }
      })
    )
  }

  private handleSendPasswordFailureResponse() {
    this.subscription.push(
      this.stateSendPasswordFailureResponse.subscribe(state => {
        if(state) {
          this.showNotification = true;
          this.notificationType = 'warning';
          this.notificationMessage = state?.error?.message ?? "Không tìm thấy tài khoản của bạn !!!";
        }
      })
    )
  }
  showModal() {
    this.isVisible = true; // Mở modal
  }

  // Phương thức để đóng modal khi bấm nút Cancel
  handleCancel(): void {
    this.isVisible = false; // Đóng modal
  }

  // Phương thức xử lý khi nhấn OK
  handleOk(): void {
    this.isVisible = false; // Đóng modal sau khi xử lý
  }

  submitEmail(): void {
    if (this.forgotPasswordForm.valid) {
      const payload = {
        email: this.forgotPasswordForm.value.email
      }
      // Thực hiện gọi API để gửi email khôi phục mật khẩu ở đây
      this.store.dispatch(ForgotPasswordActions.sendPassword({payload: payload}))
      // To do show pop up gửi thành công
    } else {
      // Nếu form không hợp lệ, bạn có thể hiển thị thông báo lỗi
      Object.values(this.forgotPasswordForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
