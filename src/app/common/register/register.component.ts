import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  getProvinces,
  getDistrictsByProvince,
  getCommunesByDistrict,
} from '../../../data/location-filter';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import {
  SendEmailRequest,
  SignupRequest,
  SignupResponse,
} from './register.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';
import { Store } from '@ngrx/store';
import { State } from './register.store.reducer';
import * as SignupActions from './register.store.action';
import { Observable, Subscription } from 'rxjs';
import {
  SignupFailureResponse,
  SignupSuccessResponse,
} from './register.store.selector';
import { LoadingComponent } from 'src/app/common-service/loading-services/loading.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  validateForm: FormGroup<{
    role: FormControl<'Resident' | 'Landlord'>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    dob: FormControl<string>;
    gender: FormControl<boolean>;
    city: FormControl<string>;
    districtOrCounty: FormControl<string>;
    communeOrWard: FormControl<string>;
    streetAddress: FormControl<string>;
  }>;
  provincesList: any[] = [];
  districtsList: any[] = [];
  communesList: any[] = [];
  isOtpModalVisible = false;
  stateSignupSuccessResponse: Observable<SignupResponse>;
  stateSignupFailureResponse: Observable<SignupResponse>;
  private readonly subscription: Subscription[] = [];
  isShowRegistFail = false;
  messageError = '';
  showNotification = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage = ""

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly store: Store<State>,
    private readonly authService: AuthService
  ) {
    this.validateForm = this.fb.group({
      role: ['Resident' as 'Resident' | 'Landlord'],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      districtOrCounty: ['', [Validators.required]],
      communeOrWard: ['', [Validators.required]],
      streetAddress: ['', [Validators.maxLength(100)]],
      gender: [false],
    });

    // Lấy danh sách tỉnh/thành phố
    this.provincesList = getProvinces();

    this.stateSignupSuccessResponse = this.store.select(SignupSuccessResponse);
    this.stateSignupFailureResponse = this.store.select(SignupFailureResponse);
  }

  ngOnInit(): void {
    this.handleSignupSuccessResponse();
    this.handleSignupFailureResponse();
  }

  private handleSignupSuccessResponse() {
    this.subscription.push(
      this.stateSignupSuccessResponse.subscribe((state) => {
        if (state) {
          setTimeout(() => {
            this.loadingComponent.finish();
          }, 2000);
          this.showNotification = true;
          this.notificationType = 'success';
          this.notificationMessage = state.message ?? "Tạo tài khoản thành công";
          const email: SendEmailRequest = {
            email: state.metadata.email ?? '',
          };
          this.authService.saveEmail(state.metadata.email ?? '');
          this.store.dispatch(SignupActions.sendEmail({ payload: email }));
          this.openOtpModal(); // Mở modal OTP khi form hợp lệ
        }
      })
    );
  }

  private handleSignupFailureResponse() {
    this.subscription.push(
      this.stateSignupFailureResponse.subscribe((state) => {
        if (state) {
          setTimeout(() => {
            this.loadingComponent.finish();
            this.showNotification = true;
            this.notificationType = 'error';
            this.notificationMessage = "Email này đã tồn tại !!!";
          }, 2000);
        }
      })
    );
  }

  onProvinceChange(provinceCode: string): void {
    this.districtsList = getDistrictsByProvince(provinceCode); // Lấy danh sách quận/huyện
    this.validateForm.get('districtOrCounty')?.reset();
    this.communesList = [];
    this.validateForm.get('communeOrWard')?.reset();
  }

  onDistrictChange(districtCode: string): void {
    this.communesList = getCommunesByDistrict(districtCode); // Lấy danh sách xã/phường
    this.validateForm.get('communeOrWard')?.reset();
  }

  submitForm(): void {
    console.log('submit', this.validateForm.valid);
    this.isShowRegistFail = false;
    this.messageError = '';
    if (this.validateForm.valid) {
      const payload: SignupRequest = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        role: this.validateForm.value.role,
        firstName: this.validateForm.value.firstName,
        lastName: this.validateForm.value.lastName,
        phoneNumber: this.validateForm.value.phoneNumber,
        dob: this.validateForm.value.dob,
        gender: this.validateForm.value.gender,
        city: this.validateForm.value.city,
        districtOrCounty: this.validateForm.value.districtOrCounty,
        communeOrWard: this.validateForm.value.communeOrWard,
        streetAddress: this.validateForm.value.streetAddress,
      };
      this.loadingComponent.start();
      this.store.dispatch(SignupActions.signup({ payload: payload }));
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
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

  onLocationChange(location: any) {
    console.log('Selected Location:', location);
    this.validateForm.patchValue({
      city: location.city,
      districtOrCounty: location.district,
      communeOrWard: location.commune,
    });
  }

  // modal verify otp
  openOtpModal() {
    this.isOtpModalVisible = true; // Mở modal
  }

  // Phương thức xử lý khi modal đóng
  handleOtpModalClose(isVisible: boolean) {
    this.isOtpModalVisible = isVisible; // Đóng modal
  }
}
