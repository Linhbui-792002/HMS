import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { getProvinces, getDistrictsByProvince, getCommunesByDistrict } from 'src/data/location-filter';

@Component({
  selector: 'app-c-quick-building',
  templateUrl: './c-quick-building.component.html',
  styleUrls: ['./c-quick-building.component.css']
})
export class CQuickBuildingComponent {
  buildingForm: FormGroup<{
    name: FormControl<string>;
    buildingId: FormControl<string>;
    city: FormControl<string>;
    districtOrCounty: FormControl<string>;
    communeOrWard: FormControl<string>;
    streetAddress: FormControl<string>;
  }>;
  provincesList: any[] = [];
  districtsList: any[] = [];
  communesList: any[] = [];

  constructor(private fb: NonNullableFormBuilder, private modal: NzModalRef) {
    this.buildingForm = this.fb.group({
      name: ['', [Validators.required]],
      buildingId: ['', [Validators.required]],
      city: ['', [Validators.required]],
      districtOrCounty: ['', [Validators.required]],
      communeOrWard: ['', [Validators.required]],
      streetAddress: ['', []],
    });

    // Lấy danh sách tỉnh/thành phố

    this.provincesList = getProvinces();
  }


  onProvinceChange(provinceCode: string): void {
    this.districtsList = getDistrictsByProvince(provinceCode); // Lấy danh sách quận/huyện
    this.buildingForm.get('districtOrCounty')?.reset();
    this.communesList = [];
    this.buildingForm.get('communeOrWard')?.reset();
  }

  onDistrictChange(districtCode: string): void {
    this.communesList = getCommunesByDistrict(districtCode); // Lấy danh sách xã/phường
    this.buildingForm.get('communeOrWard')?.reset();
  }

  submitForm(): void {
    if (this.buildingForm.valid) {
      console.log('Thêm mới tòa nhà', this.buildingForm.value);
      this.modal.destroy(this.buildingForm.value);
    } else {
      // Đánh dấu các trường đã bị dirty
      Object.values(this.buildingForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
