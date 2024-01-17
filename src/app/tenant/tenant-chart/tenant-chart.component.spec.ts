import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantChartComponent } from './tenant-chart.component';

describe('TenantChartComponent', () => {
  let component: TenantChartComponent;
  let fixture: ComponentFixture<TenantChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantChartComponent]
    });
    fixture = TestBed.createComponent(TenantChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
