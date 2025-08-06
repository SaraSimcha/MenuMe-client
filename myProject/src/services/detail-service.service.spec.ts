import { TestBed } from '@angular/core/testing';

import { DetailsService } from './detail-service.service';

describe('DetailServiceService', () => {
  let service: DetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
