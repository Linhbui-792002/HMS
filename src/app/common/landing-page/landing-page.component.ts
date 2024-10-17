import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';
import { LoadingComponent } from 'src/app/common-service/loading-services/loading.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;

  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {}

  directionRegister() {
    this.loadingComponent.start();
    setTimeout(() => {
      this.router.navigate(['/register']);
      this.loadingComponent.finish();
    }, 2000);
  }

  directionLogin() {
    this.loadingComponent.start();
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.loadingComponent.finish();
    }, 2000);
  }
}
