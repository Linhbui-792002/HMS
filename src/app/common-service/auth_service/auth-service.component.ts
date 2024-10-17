// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private readonly router: Router
  ) { }

  private readonly TOKEN_LIFESPAN = 7200 * 1000;

  saveTokens(accessToken: string, refreshToken: string): void {
    const expirationTime = Date.now() + this.TOKEN_LIFESPAN;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  saveEmail(email: string) {
    sessionStorage.setItem('email', email);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  }

  getEmail(): string | null {
    return sessionStorage.getItem('email');
  }

  isTokenExpired(): boolean {
    const expirationTime = parseInt(sessionStorage.getItem('tokenExpiration') ?? '0', 10);
    return Date.now() > expirationTime; // Returns true if token has expired
  }

  checkTokenExpired() {
    if(this.isTokenExpired()) {
      this.router.navigate(["/login"])
    } 
  }

  clearTokens(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

}