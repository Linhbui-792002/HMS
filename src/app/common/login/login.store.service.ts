import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, SendEmailRequest } from './login.model';
import {environment} from '../../environments/evironment'

@Injectable({
  providedIn: 'root',
})
export class LoginStoreService {
  constructor(private readonly http: HttpClient ) {}

  login(payload: LoginRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/access/login`,
      payload
    );
  }

  sendEmail(payload: SendEmailRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/send-mail/send-otp-verify`,
      payload
    );
  }
}
