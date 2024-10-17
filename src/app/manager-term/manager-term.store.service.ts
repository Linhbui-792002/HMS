import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InitTermInfoResponse } from './manager-term.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/evironment';
import { AuthService } from '../common-service/auth_service/auth-service.component';

@Injectable({
  providedIn: 'root',
})
export class ManagerTermStoreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  initTermInfo(param: {}): Observable<any> {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.get(` ${environment.baseapi}/term`, {
      headers,
      params: param,
    });
  }

  deleteTermInfo(param: {}) {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.delete(` ${environment.baseapi}/term`, {
      headers,
      body: param,
    });
  }
}
