import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuBuildingComponent } from './cu-building.component';

describe('CuBuildingComponent', () => {
  let component: CuBuildingComponent;
  let fixture: ComponentFixture<CuBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuBuildingComponent]
    });
    fixture = TestBed.createComponent(CuBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
