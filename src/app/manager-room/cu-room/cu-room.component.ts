import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cu-room',
  templateUrl: './cu-room.component.html',
  styleUrls: ['./cu-room.component.css']
})
export class CuRoomComponent implements OnInit {
  roomForm: FormGroup;
  showNotification = false;
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  notificationMessage = '';

  furnitureOptions = [
    { id: '1', name: 'Sofa' },
    { id: '2', name: 'Table' },
    { id: '3', name: 'Chair' },
    { id: '4', name: 'Desk' },
    { id: '5', name: 'Bed' },
    // Add other furniture options here
  ];

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      buildingId: ['12', Validators.required],
      roomNumber: ['', Validators.required],
      floor: [1, Validators.required],
      area: [0, Validators.required],
      maxPeople: [0, Validators.required],
      numResidents: [0],
      price: [0, Validators.required],
      furniture: this.fb.array([]),
      buildingService: this.fb.array([]), // Initialize as FormArray
      status: [true] // Default status
    });
  }

  ngOnInit(): void {
    // Optionally, you can add an initial furniture item here
    this.addFurniture();
  }

  // Getter for easy access to furniture FormArray
  get furniture(): FormArray {
    return this.roomForm.get('furniture') as FormArray;
  }

  // Method to add a new furniture item
  addFurniture(): void {
    const furnitureGroup = this.fb.group({
      furnitureId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.furniture.push(furnitureGroup);
  }

  // Method to remove a furniture item
  removeFurniture(index: number): void {
    if (this.furniture.length > 1) {
      this.furniture.removeAt(index);
    }
  }

  get availableFurnitureOptions() {
    const selectedIds = this.furniture.controls.map((control) => control.get('furnitureId')?.value);
    return this.furnitureOptions.filter(option => !selectedIds.includes(option.id));
  }

  // Method to submit the form
  submitForm(): void {
    console.log(this.roomForm.valid, 'this.roomForm.valid');
    if (this.roomForm.valid) {
      console.log('Form Submitted', this.roomForm.value);
      this.notificationType = 'success';
      this.notificationMessage = 'tạo thành công';
    } else {
      this.roomForm.markAllAsTouched();
      Object.values(this.roomForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });  // Mark all fields as touched to trigger validation messages
    }
    this.showNotification = true;
  }

}
