import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertiesComponent } from './my-properties.component';

describe('MyPropertiesComponent', () => {
  let component: MyPropertiesComponent;
  let fixture: ComponentFixture<MyPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPropertiesComponent]
    });
    fixture = TestBed.createComponent(MyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
