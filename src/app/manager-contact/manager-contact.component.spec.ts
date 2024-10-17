import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerContactComponent } from './manager-contact.component';

describe('ManagerContactComponent', () => {
  let component: ManagerContactComponent;
  let fixture: ComponentFixture<ManagerContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerContactComponent]
    });
    fixture = TestBed.createComponent(ManagerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
