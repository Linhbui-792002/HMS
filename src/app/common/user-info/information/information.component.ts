import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  userInfo = {
    _id: '6708f202083ec51a680753e4',
    firstName: 'Linh',
    lastName: 'Bùi',
    phoneNumber: '0375171253',
    dob: '2002-07-08T17:00:00.000Z',
    gender: true,
    city: 'HaNoi',
    districtOrCounty: 'HaiBaTrung',
    communeOrWard: 'MinhKhai',
    streetAddress: '182 Minh khai',
    isDelete: false,
  };
}
