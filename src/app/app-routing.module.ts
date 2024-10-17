import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { ManagerBuildingComponent } from './manager-building/manager-building.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { RegisterComponent } from './common/register/register.component';
import { UserInfoComponent } from './common/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'landlord',
    component: BaseLayoutComponent,
  },
  {
    path: 'admin',
    component: BaseLayoutComponent,
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
