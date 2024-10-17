import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// manager-building
import { ManagerBuildingComponent } from './manager-building/manager-building.component';
import { storeKey as managerBuildingStoreKey } from './manager-building/manager-building.store.action';
import { reducer as managerBuildingReducer } from './manager-building/manager-building.store.reducer';
import { ManagerBuildingEffects } from './manager-building/manager-building.store.effect';
import { ManagerBuildingStoreService } from './manager-building/manager-building.store.service';

// side menu
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './common-service/spinner/spinner.component';
import { ModalComponent } from './common-service/modal/modal.component';
import { MessageComponent } from './common-service/message/message.component';

// login component
import { LoginComponent } from './common/login/login.component';
import { LoginEffects } from './common/login/login.store.effect';
import { storeKey as LoginActionStoreKey } from './common/login/login.store.action';
import { reducer as LoginReducer } from './common/login/login.store.reducer';
import { LoginStoreService } from './common/login/login.store.service';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// loading
import { LoadingComponent } from './common-service/loading-services/loading.component';

// regulation
import { CuTermStoreService } from './manager-term/cu-term/cu-term.store.service';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

// ant design
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

// landing page
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

// Manager Furnitures
import { ManagerFurnituresComponent } from './manager-furniture/manager-furniture.component';
import { ManagerFurnituresEffects } from './manager-furniture/manager-furnitures.store.effect';
import { ManagerFurnituresStoreService } from './manager-furniture/manager-furnitures.store.service';
import { storeKey as createFurnituresAction } from './manager-furniture/manager-furnitures.store.action';
import { reducer as createFurnituresReducer } from './manager-furniture/manager-furnitures.store.reducer';

//
import { CuFurnituresComponent } from './manager-furniture/cu-furnitures/cu-furnitures.component';
// import { CuFurnituresStoreService } from './manager-furniture/cu-furnitures/cu-furnitures.store.service';
import { CuFurnituresEffects } from './manager-furniture/cu-furnitures/cu-furnitures.store.effect';
import { storeKey as cuFurnituresAction } from './manager-furniture/cu-furnitures/cu-furnitures.store.action';
import { reducer as cuFurnituresReducer } from './manager-furniture/cu-furnitures/cu-furnitures.store.reducer';
import { HeaderComponent } from './common/landing-page/layout/header/header.component';
import { FooterComponent } from './common/landing-page/layout/footer/footer.component';
import { SearchComponent } from './common/landing-page/search/search.component';
import { TeamComponent } from './common/landing-page/team/team.component';

// Manager Term and Conditions
import { ManagerTermComponent } from './manager-term/manager-term.component';
import { storeKey as managerTermAction } from './manager-term/manager-term.store.action';
import { reducer as managerTermReducer } from './manager-term/manager-term.store.reducer';
import { ManagerTermEffects } from './manager-term/manager-term.store.effect';

import { CuTermComponent } from './manager-term/cu-term/cu-term.component';
import { storeKey as cuTermAction } from './manager-term/cu-term/cu-term.store.action';
import { reducer as cuTermReducer } from './manager-term/cu-term/cu-term.store.reducer';
import { CuTermEffects } from './manager-term/cu-term/cu-term.store.effect';

registerLocaleData(en);

// Component Zorro Lib
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NotiUserComponent } from './common/landing-page/layout/noti-user/noti-user.component';
import { ManagerBuildingServiceComponent } from './manager-building-service/manager-building-service.component';
import { CuBuildingServiceComponent } from './manager-building-service/cu-building-service/cu-building-service.component';
import { ManagerContactComponent } from './manager-contact/manager-contact.component';
import { UserInfoComponent } from './common/user-info/user-info.component';
import { InformationComponent } from './common/user-info/information/information.component';
import { UpdateInformationComponent } from './common/user-info/update-information/update-information.component';
import { CuBuildingComponent } from './manager-building/cu-building/cu-building.component';
import { CQuickBuildingComponent } from './manager-building/c-quick-building/c-quick-building.component';
import { ManagerRoomComponent } from './manager-room/manager-room.component';
import { CuRoomComponent } from './manager-room/cu-room/cu-room.component';
import { CQuickRoomComponent } from './manager-room/c-quick-room/c-quick-room.component';
import { NotificationComponent } from './common/notification/notification.component';
import { ManagerTermStoreService } from './manager-term/manager-term.store.service';

// verify otp
import { VerifyOtpComponent } from './common/verify-otp/verify-otp.component';
import { storeKey as VerifyOtpAction } from './common/verify-otp/verify-otp.store.action';
import { reducer as VerifyOtpReducer } from './common/verify-otp/verify-otp.store.reducer';
import { VerifyOtpEffects } from './common/verify-otp/verify-otp.store.effect';
import { VerifyOtpStoreService } from './common/verify-otp/verify-otp.store.service';

// sign up
import { RegisterComponent } from './common/register/register.component';
import { storeKey as RegistAction } from './common/register/register.store.action';
import { reducer as RegistReducer } from './common/register/register.store.reducer';
import { RegistEffects } from './common/register/register.store.effect';
import { RegistStoreService } from './common/register/register.store.service';

// forgot password
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { storeKey as ForgotPasswordAction } from './common/forgot-password/forgot-password.store.action';
import { reducer as ForgotPasswordReducer } from './common/forgot-password/forgot-password.store.reducer';
import { ForgotPasswordEffects } from './common/forgot-password/forgot-password.store.effect';
import { ForgotPasswordStoreService } from './common/forgot-password/forgot-password.store.service';
import { CuFurnituresStoreService } from './manager-furniture/cu-furnitures/cu-furnitures.store.service';

@NgModule({
  declarations: [
    AppComponent,
    ManagerBuildingComponent,
    SideMenuComponent,
    SpinnerComponent,
    ModalComponent,
    MessageComponent,
    LoginComponent,
    LoadingComponent,
    RegisterComponent,
    LandingPageComponent,
    BaseLayoutComponent,
    CuFurnituresComponent,
    ManagerTermComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    TeamComponent,
    CuTermComponent,
    NotiUserComponent,
    ManagerBuildingServiceComponent,
    CuBuildingServiceComponent,
    ManagerContactComponent,
    UserInfoComponent,
    InformationComponent,
    UpdateInformationComponent,
    CuBuildingComponent,
    CQuickBuildingComponent,
    ManagerRoomComponent,
    CuRoomComponent,
    CQuickRoomComponent,
    NotificationComponent,
    VerifyOtpComponent,
    ForgotPasswordComponent,
    ManagerFurnituresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // FontAwesomeModule,
    StoreModule.forFeature(managerBuildingStoreKey, managerBuildingReducer),
    StoreModule.forFeature(LoginActionStoreKey, LoginReducer),
    // StoreModule.forFeature(createRegulationAction, createRegulationReducer),
    StoreModule.forFeature(createFurnituresAction, createFurnituresReducer),
    StoreModule.forFeature(cuFurnituresAction, cuFurnituresReducer),
    StoreModule.forFeature(VerifyOtpAction, VerifyOtpReducer),
    StoreModule.forFeature(RegistAction, RegistReducer),
    StoreModule.forFeature(ForgotPasswordAction, ForgotPasswordReducer),
    StoreModule.forFeature(managerTermAction, managerTermReducer),
    StoreModule.forFeature(cuTermAction, cuTermReducer),
    EffectsModule.forRoot([
      ManagerBuildingEffects,
      LoginEffects,
      ManagerFurnituresEffects,
      CuFurnituresEffects,
      VerifyOtpEffects,
      RegistEffects,
      ForgotPasswordEffects,
      ManagerTermEffects,
      CuTermEffects,
    ]),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    NzIconModule,
    NzTableModule,
    RouterModule,
    NzButtonModule,
    NzDividerModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBadgeModule,
    NzSwitchModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzEmptyModule,
    NzInputNumberModule,
    NzTagModule,
    NzPaginationModule,
    NzNotificationModule,
  ],
  providers: [
    ManagerBuildingStoreService,
    ManagerFurnituresStoreService,
    CuFurnituresStoreService,
    VerifyOtpStoreService,
    RegistStoreService,
    ForgotPasswordStoreService,
    LoginStoreService,
    ManagerTermStoreService,
    CuTermStoreService,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
