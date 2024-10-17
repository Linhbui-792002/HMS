import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuBuildingServiceComponent } from './cu-building-service.component';

describe('CuBuildingServiceComponent', () => {
  let component: CuBuildingServiceComponent;
  let fixture: ComponentFixture<CuBuildingServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuBuildingServiceComponent]
    });
    fixture = TestBed.createComponent(CuBuildingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
