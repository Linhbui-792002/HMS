import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoomComponent } from './manager-room.component';

describe('ManagerRoomComponent', () => {
  let component: ManagerRoomComponent;
  let fixture: ComponentFixture<ManagerRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerRoomComponent]
    });
    fixture = TestBed.createComponent(ManagerRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
