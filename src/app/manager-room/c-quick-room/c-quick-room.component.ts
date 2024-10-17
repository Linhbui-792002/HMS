import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-c-quick-room',
  templateUrl: './c-quick-room.component.html',
  styleUrls: ['./c-quick-room.component.css']
})


export class CQuickRoomComponent implements OnInit {
  roomForm: FormGroup;

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
      numberRoom: [0, Validators.required],
      nameRoom: ['', Validators.required],
      floors: [[]],
      area: [0, Validators.required],
      maxPeople: [0, Validators.required],
      numResidents: [0],
      price: [0, Validators.required],
      furniture: this.fb.array([]),
      buildingService: this.fb.array([]),
      status: [true]
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
    if (this.roomForm.valid) {
      console.log('Form Submitted', this.roomForm.value);
    } else {
      this.roomForm.markAllAsTouched();
      Object.values(this.roomForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });  // Mark all fields as touched to trigger validation messages
    }
  }
}
