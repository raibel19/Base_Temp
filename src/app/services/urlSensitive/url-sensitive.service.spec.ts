import { TestBed } from '@angular/core/testing';

import { UrlSensitiveService } from './url-sensitive.service';

describe('UrlSensitiveService', () => {
  let service: UrlSensitiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlSensitiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
