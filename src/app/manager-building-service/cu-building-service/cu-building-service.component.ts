import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-cu-building-service',
  templateUrl: './cu-building-service.component.html',
  styleUrls: ['./cu-building-service.component.css'],
})
export class CuBuildingServiceComponent {
  @Input() serviceData: any;
  buildingServiceForm!: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {
    this.buildingServiceForm = this.fb.group({
      serviceName: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: [''],
      isDelete: [false],
    });
  }

  ngOnInit(): void {
    console.log(this.serviceData, 'data được field sang');

    if (this.serviceData) {
      this.buildingServiceForm.patchValue({
        serviceName: this.serviceData.serviceName,
        price: this.serviceData.price,
        type: this.serviceData.type,
        isDelete: this.serviceData.isDelete,
      });
    }
  }

  handleOk(): void {
    if (this.buildingServiceForm.valid) {
      console.log('Thêm mới dịch vụ', this.buildingServiceForm.value);
      this.modal.destroy(this.buildingServiceForm.value);
    } else {
      // Đánh dấu các trường đã bị dirty
      Object.values(this.buildingServiceForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
