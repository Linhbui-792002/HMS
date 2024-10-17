import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegistFurnituresResponse } from './cu-furnitures.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/evironment';
import { AuthService } from 'src/app/common-service/auth_service/auth-service.component';

@Injectable({
  providedIn: 'root',
})
export class CuFurnituresStoreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  registFurnitures(param: {}): Observable<any> {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.post(` ${environment.baseapi}/furniture`, param, {
      headers,
    });
  }

  updateFurniture(param: {}) {
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'content-Type': 'application/json',
      'x-client-id': '6708f202083ec51a680753e6',
    });

    return this.http.patch(` ${environment.baseapi}/furniture`, param, {
      headers,
    });
  }
}
