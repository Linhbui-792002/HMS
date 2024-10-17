import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';
import { State } from './verify-otp.store.reducer';
import { verifyOtpFailureReponse, verifyOtpResponse } from './verify-otp.store.selector';
import { Store } from '@ngrx/store';
import * as VerifyOtpActions from './verify-otp.store.action';
import { VerifyOtpRequest } from './verify-otp.model';
import { Router } from '@angular/router';
import * as sendEmailAction from '../register/register.store.action';
import { SendEmailRequest } from '../login/login.model';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOtpComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>(); // Sự kiện để đóng modal
  otpForm: FormGroup; // FormGroup cho OTP
  otpValues: string[] = ['', '', '', '', '', '']; // Mảng chứa giá trị OTP (6 ô)
  private readonly subscription: Subscription[] = [];
  stateVerifyOtpResponse: Observable<any>;
  stateVerifyOtpFailureReponse: Observable<any>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly store: Store<State>,
    private readonly router: Router
  ) {
    this.otpForm = this.fb.group({
      otp1: [''],
      otp2: [''],
      otp3: [''],
      otp4: [''],
      otp5: [''],
      otp6: [''],
    });
    this.stateVerifyOtpResponse = this.store.select(verifyOtpResponse);

    this.stateVerifyOtpFailureReponse = this.store.select(verifyOtpFailureReponse);
  }

  ngOnInit(): void {

    
    this.subscribeVerifyOtpResponse();
    this.subscribeVerifyOtpFailureResponse();
  }

  private subscribeVerifyOtpFailureResponse() {
    this.subscription.push(
      this.stateVerifyOtpFailureReponse.subscribe((state) => {
        if(state) {
          // To do hien thi thong bao loi otp khong dung
          console.log("state ==>", state);
        }
      })
    )
  }

  /**
   * Verify otp response
   */
  private subscribeVerifyOtpResponse() {
    this.subscription.push(
      this.stateVerifyOtpResponse.subscribe((state) => {
        if (state) {
          this.handleCancel()
          this.router.navigate(["/login"]);
        }
      })
    );
  }

  // Phương thức để đóng modal
  handleCancel(): void {
    this.isVisible = false; // Đóng modal
    this.isVisibleChange.emit(this.isVisible); // Phát sự kiện đóng modal cho component cha
  }

  // Phương thức xử lý gửi OTP
  handleOk(): void {
    if (this.isOtpComplete()) {
      const otp = this.otpValues.join('');

      if(otp.length === 6) {
        const verifyEmailReq: VerifyOtpRequest = {
          email: this.authService.getEmail() ?? '',
          submitOtp: Number(otp),
        };
        this.store.dispatch(
          VerifyOtpActions.verifyOtp({ payload: verifyEmailReq })
        );
      }
    }
  }

  // Phương thức kiểm tra xem tất cả các ô OTP đã được nhập hay chưa
  isOtpComplete(): boolean {
    return this.otpValues.every((value) => value.length === 1);
  }

  // Method to handle input changes
  onOtpChange(value: string, index: number): void {
    this.otpValues[index] = value; // Update the value in the array
    if (value && index < this.otpValues.length - 1) {
      // Move focus to the next input
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
    this.handleOk();
  }

  // Method to handle backspace
  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      // Move focus to the previous input if current input is empty
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }

  onResendOtp() {
    // Todo show popup resend otp
    const payload : SendEmailRequest = {
      email: this.authService.getEmail() ?? ""
    }
    this.store.dispatch(sendEmailAction.sendEmail({payload: payload}))
  }
}
