import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertylistingsComponent } from './propertylistings.component';

describe('PropertylistingsComponent', () => {
  let component: PropertylistingsComponent;
  let fixture: ComponentFixture<PropertylistingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertylistingsComponent]
    });
    fixture = TestBed.createComponent(PropertylistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
