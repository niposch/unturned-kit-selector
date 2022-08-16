import { TestBed } from '@angular/core/testing';

import { KitLocalStorageService } from './kit-local-storage.service';

describe('KitLocalStorageService', () => {
  let service: KitLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
