import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantdashboardComponent } from './tenantdashboard.component';

describe('TenantdashboardComponent', () => {
  let component: TenantdashboardComponent;
  let fixture: ComponentFixture<TenantdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantdashboardComponent]
    });
    fixture = TestBed.createComponent(TenantdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
