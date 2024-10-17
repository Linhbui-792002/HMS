import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegistTermInfoResponse } from './cu-term.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/evironment';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';

@Injectable({
  providedIn: 'root',
})
export class CuTermStoreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  registTerm(param: {}): Observable<any> {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.post(` ${environment.baseapi}/term`, param, {
      headers,
    });
  }
  updateTerm(param: {}) {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.patch(` ${environment.baseapi}/term`, param, {
      headers,
    });
  }
}
