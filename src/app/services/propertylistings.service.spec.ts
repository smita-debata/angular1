import { TestBed } from '@angular/core/testing';

import { PropertylistingsService } from './propertylistings.service';

describe('PropertylistingsService', () => {
  let service: PropertylistingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertylistingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
