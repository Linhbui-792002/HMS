import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InitBuildingInfo } from './manager-building.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../common-service/auth_service/auth-service.component';
import {environment} from '../environments/evironment'

@Injectable({
  providedIn: 'root',
})
export class ManagerBuildingStoreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

 

  

  initBuildingInfo(param: {}): Observable<any> {
    //   const  buildingInfo = [
    //     {
    //       _id: '1',
    //       name: 'YoungHouse 1',
    //       floorNumber: 4,
    //       address: 'Thon 3 Thach Hoa Thach That Ha Noi',
    //     },
    //     {
    //       _id: '2',
    //       name: 'YoungHouse 2',
    //       floorNumber: 2,
    //       address: 'Thon 3 Thach Hoa Thach That Ha Noi',
    //     },
    //   ]
    // const response = {
    //   body: {
    //     resultCd: 0,
    //     landlordId: 1,
    //     buildingInfo: buildingInfo,
    //   },
    // };
    // return of(response);

    const token = this.authService.getAccessToken();
    
    // Set headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(
      ` ${environment.baseapi}/building`,
      {headers}
    );
  }

  getRoomsInfo(param: {}): Observable<any> {
    const  roomList = [
      {
        name: '103b',
        floor: 1,
      },
      {
        name: '104b',
        floor: 1,
      }, {
        name: '105b',
        floor: 1,
      }, {
        name: '106b',
        floor: 1,
      },
      {
        name: '203b',
        floor: 2,
      },
      {
        name: '204b',
        floor: 2,
      },
      {
        name: '303b',
        floor: 3,
      },{
        name: '303b',
        floor: 3,
      },
    ]
  const response = {
    body: {
      resultCd: 0,
      roomList: roomList,
    },
  };
  return of(response);
}


}
