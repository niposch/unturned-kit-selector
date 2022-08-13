import { TestBed } from '@angular/core/testing';

import { ItemRarityService } from './item-rarity.service';

describe('ItemRarityService', () => {
  let service: ItemRarityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRarityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
