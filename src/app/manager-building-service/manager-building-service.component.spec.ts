import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBuildingServiceComponent } from './manager-building-service.component';

describe('ManagerBuildingServiceComponent', () => {
  let component: ManagerBuildingServiceComponent;
  let fixture: ComponentFixture<ManagerBuildingServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerBuildingServiceComponent]
    });
    fixture = TestBed.createComponent(ManagerBuildingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
