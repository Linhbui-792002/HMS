import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiUserComponent } from './noti-user.component';

describe('NotiUserComponent', () => {
  let component: NotiUserComponent;
  let fixture: ComponentFixture<NotiUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotiUserComponent]
    });
    fixture = TestBed.createComponent(NotiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
