import { TestBed } from '@angular/core/testing';

import { StorageControllerService } from './storage-controller.service';

describe('StorageControllerService', () => {
  let service: StorageControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
