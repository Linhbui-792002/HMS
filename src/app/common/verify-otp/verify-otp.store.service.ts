import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VerifyOtpRequest } from './verify-otp.model';
import {environment} from '../../environments/evironment'

@Injectable({
  providedIn: 'root',
})
export class VerifyOtpStoreService {
  constructor(private readonly http: HttpClient ) {}

  verifyOtp(payload: VerifyOtpRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/access/verify-email`,
      payload
    );
  }
}
