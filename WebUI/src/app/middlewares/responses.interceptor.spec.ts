import { TestBed } from '@angular/core/testing';

import { ResponsesInterceptor } from './responses.interceptor';

describe('ResponsesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponsesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponsesInterceptor = TestBed.inject(ResponsesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
