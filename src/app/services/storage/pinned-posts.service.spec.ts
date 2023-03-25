import { TestBed } from '@angular/core/testing';

import { PinnedPostsService } from './pinned-posts.service';

describe('PinnedPostsService', () => {
  let service: PinnedPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinnedPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
