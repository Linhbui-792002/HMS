import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InitFurnituresResponse } from './manager-furnitures.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/evironment';
import { AuthService } from '../common-service/auth_service/auth-service.component';

@Injectable({
  providedIn: 'root',
})
export class ManagerFurnituresStoreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  initFurnitures(param): Observable<any> {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.get(` ${environment.baseapi}/furniture`, {
      headers,
      params: param.options,
    });
  }

  deleteFurnitures(param: {}) {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.delete(` ${environment.baseapi}/furniture`, {
      headers,
      body: param,
    });
  }
}
