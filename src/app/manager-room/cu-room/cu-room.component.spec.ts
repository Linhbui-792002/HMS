import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuRoomComponent } from './cu-room.component';

describe('CuRoomComponent', () => {
  let component: CuRoomComponent;
  let fixture: ComponentFixture<CuRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuRoomComponent]
    });
    fixture = TestBed.createComponent(CuRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
