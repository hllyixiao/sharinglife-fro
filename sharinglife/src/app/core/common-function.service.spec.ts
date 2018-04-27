import { TestBed, inject } from '@angular/core/testing';

import { CommonFunctionService } from './common-function.service';

describe('CommonFunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFunctionService]
    });
  });

  it('should be created', inject([CommonFunctionService], (service: CommonFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
