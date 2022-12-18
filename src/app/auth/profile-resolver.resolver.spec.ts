import { TestBed } from '@angular/core/testing';

import { ProfileResolverResolver } from './profile-resolver.resolver';

describe('ProfileResolverResolver', () => {
  let resolver: ProfileResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfileResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
