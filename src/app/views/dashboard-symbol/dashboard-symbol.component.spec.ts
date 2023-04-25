import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSymbolComponent } from './dashboard-symbol.component';

describe('DashboardSymbolComponent', () => {
  let component: DashboardSymbolComponent;
  let fixture: ComponentFixture<DashboardSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
