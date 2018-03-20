import { TestBed, inject } from '@angular/core/testing';

import { ServupService } from './servup.service';

describe('ServupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServupService]
    });
  });

  it('should be created', inject([ServupService], (service: ServupService) => {
    expect(service).toBeTruthy();
  }));
});
