import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQuickBuildingComponent } from './c-quick-building.component';

describe('CQuickBuildingComponent', () => {
  let component: CQuickBuildingComponent;
  let fixture: ComponentFixture<CQuickBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CQuickBuildingComponent]
    });
    fixture = TestBed.createComponent(CQuickBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
