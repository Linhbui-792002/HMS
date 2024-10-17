import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignupRequest, SendEmailRequest } from './register.model';
import {environment} from '../../environments/evironment'

@Injectable({
  providedIn: 'root',
})
export class RegistStoreService {
  constructor(private readonly http: HttpClient ) {}
  sendEmail(payload: SendEmailRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/send-mail/send-otp-verify`,
      payload
    );
  }

  signup(payload: SignupRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/access/signup`,
      payload
    );
  }
}
