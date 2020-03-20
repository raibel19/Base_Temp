import { TestBed } from '@angular/core/testing';

import { NoCacheInterceptorService } from './no-cache-interceptor.service';

describe('NoCacheInterceptorService', () => {
  let service: NoCacheInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoCacheInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
