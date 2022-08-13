import { TestBed } from '@angular/core/testing';

import { RarityColorServiceService } from './rarity-color-service.service';

describe('RarityColorServiceService', () => {
  let service: RarityColorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RarityColorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
