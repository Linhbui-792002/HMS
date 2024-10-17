import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordRequest } from './forgot-password.model';
import {environment} from '../../environments/evironment'

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordStoreService {
  constructor(private readonly http: HttpClient ) {}

  sendPassword(payload: ForgotPasswordRequest): Observable<any> {
    return this.http.post(
      ` ${environment.baseapi}/access/forgot-password`,
      payload
    );
  }
}
