import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getProvinces,
  getDistrictsByProvince,
  getCommunesByDistrict,
} from '../../../../data/location-filter';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.css'],
})
export class UpdateInformationComponent implements OnInit {
  updateForm: FormGroup;
  provincesList: any[] = [];
  districtsList: any[] = [];
  communesList: any[] = [];

  constructor() {
    this.updateForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl(false), // false for male, true for female
      streetAddress: new FormControl('', [Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required]),
      districtOrCounty: new FormControl('', [Validators.required]),
      communeOrWard: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Load existing user information here
    this.loadUserData();

    // Load provinces
    this.provincesList = getProvinces();
  }

  loadUserData(): void {
    // Mock data - replace with actual data retrieval
    const userData = {
      _id: '6708f202083ec51a680753e4',
      firstName: 'Linh',
      lastName: 'Bùi',
      phoneNumber: '0375171253',
      dob: '2002-07-08T17:00:00.000Z',
      gender: true,
      city: '01',
      districtOrCounty: '007',
      communeOrWard: '00295',
      streetAddress: '182 Minh khai',
      isDelete: false,
    };

    // Patch the form with existing user data
    this.updateForm.patchValue(userData);
  }

  onProvinceChange(provinceCode: string): void {
    this.districtsList = getDistrictsByProvince(provinceCode); // Lấy danh sách quận/huyện
    this.updateForm.get('districtOrCounty')?.reset();
    this.communesList = [];
    this.updateForm.get('communeOrWard')?.reset();
  }

  onDistrictChange(districtCode: string): void {
    this.communesList = getCommunesByDistrict(districtCode); // Lấy danh sách xã/phường
    this.updateForm.get('communeOrWard')?.reset();
  }

  submitUpdateForm(): void {
    if (this.updateForm.valid) {
      console.log('Updated Information:', this.updateForm.value);
      // Call your service to update user information here
    } else {
      Object.values(this.updateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
