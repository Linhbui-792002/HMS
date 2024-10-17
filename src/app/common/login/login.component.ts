import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Store } from '@ngrx/store';
import { State } from './login.store.reducer';
import * as LoginActions from './login.store.action';
import {
  LoginFailResponse,
  LoginSuccessResponse,
} from './login.store.selector';
import {
  LoginFailureResponse,
  LoginRequest,
  LoginResponse,
  SendEmailRequest,
} from './login.model';
import { Observable, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';
import { LoadingComponent } from 'src/app/common-service/loading-services/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  isVisible = false;
  private readonly subscription: Subscription[] = [];
  isOtpModalVisible = false;
  stateLoginResponse: Observable<LoginResponse>;
  stateLoginFailureResponse: Observable<LoginFailureResponse>;
  showNotification = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage = ""

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: Store<State>,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.stateLoginResponse = this.store.select(LoginSuccessResponse);

    this.stateLoginFailureResponse = this.store.select(LoginFailResponse);
  }

  ngOnInit(): void {
    this.subscribeLoginResponse();
    this.handleLoginFailureResponse();
  }

  private handleLoginFailureResponse() {
    this.subscription.push(
      this.stateLoginFailureResponse.subscribe((state) => {
        if (state) {
          setTimeout(() => {
            this.loadingComponent.finish();
            this.showNotification = true;
            this.notificationType = "error";
            this.notificationMessage = state.error.message ?? "";
          }, 2000);
        }
      })
    );
  }

  private subscribeLoginResponse() {
    this.subscription.push(
      this.stateLoginResponse.subscribe((state) => {
        if (state) {
          setTimeout(() => {
            this.loadingComponent.finish();
          }, 2000);
          this.authService.saveEmail(state.metadata?.account?.email ?? '');
          if (!state.metadata?.account?.isVerified) {
            // To do hien thi message popup
            const emailRequest: SendEmailRequest = {
              email: state.metadata?.account?.email,
            };
            this.store.dispatch(
              LoginActions.sendEmail({ payload: emailRequest })
            );
            this.openOtpModal();
          } else {
            // To loading
            this.authService.saveTokens(
              state.metadata.tokens?.accessToken ?? '',
              state.metadata.tokens?.refreshToken ?? ''
            );

            switch (state.metadata.account.role) {
              case 'Landlord':
                this.router.navigate(['/landlord']);
                break;
              case 'Admin':
                this.router.navigate(['/admin']);
                break;
              case 'Resident':
              case 'Employee':
                this.router.navigate(['/landingpages']);
                break;    
              default:
                this.router.navigate(['/landingpage']);
            }
          }
        }
      })
    );
  }

  submitForm(): void {
    this.showNotification = false;
    this.notificationMessage = "";
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const payload: LoginRequest = {
        email: this.validateForm.value.email?.toString() ?? '',
        password: this.validateForm.value.password?.toString() ?? '',
      };
      this.loadingComponent.start();
      this.store.dispatch(LoginActions.login({ payload: payload }));
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // modal verify otp
  openOtpModal() {
    this.isOtpModalVisible = true; // Mở modal
  }

  // Phương thức xử lý khi modal đóng
  handleOtpModalClose(isVisible: boolean) {
    this.isOtpModalVisible = isVisible; // Đóng modal
  }
}
