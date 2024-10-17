import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQuickRoomComponent } from './c-quick-room.component';

describe('CQuickRoomComponent', () => {
  let component: CQuickRoomComponent;
  let fixture: ComponentFixture<CQuickRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CQuickRoomComponent]
    });
    fixture = TestBed.createComponent(CQuickRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
