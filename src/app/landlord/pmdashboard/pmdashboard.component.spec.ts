import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdashboardComponent } from './pmdashboard.component';

describe('PmdashboardComponent', () => {
  let component: PmdashboardComponent;
  let fixture: ComponentFixture<PmdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmdashboardComponent]
    });
    fixture = TestBed.createComponent(PmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
