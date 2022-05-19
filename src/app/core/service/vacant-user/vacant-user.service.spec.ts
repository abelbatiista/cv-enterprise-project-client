import { TestBed } from '@angular/core/testing';

import { VacantUserService } from './vacant-user.service';

describe('VacantUserService', () => {
  let service: VacantUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacantUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
