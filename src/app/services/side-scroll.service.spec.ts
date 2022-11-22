import { TestBed } from '@angular/core/testing';

import { SideScrollService } from './side-scroll.service';

describe('SideScrollService', () => {
  let service: SideScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
