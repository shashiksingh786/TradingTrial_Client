import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineChartsComponent } from './spline-charts.component';

describe('SplineChartsComponent', () => {
  let component: SplineChartsComponent;
  let fixture: ComponentFixture<SplineChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplineChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
