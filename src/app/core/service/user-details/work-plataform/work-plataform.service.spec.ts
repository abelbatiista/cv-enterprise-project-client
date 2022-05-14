import { TestBed } from '@angular/core/testing';

import { WorkPlataformService } from './work-plataform.service';

describe('WorkPlataformService', () => {
  let service: WorkPlataformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPlataformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
