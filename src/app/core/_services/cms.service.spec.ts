import { TestBed } from '@angular/core/testing';

import { CmsService } from './cms.service';

describe('cmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsService = TestBed.get(CmsService);
    expect(service).toBeTruthy();
  });
});
