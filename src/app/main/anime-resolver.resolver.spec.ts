import { TestBed } from '@angular/core/testing';

import { AnimeResolverResolver } from './anime-resolver.resolver';

describe('AnimeResolverResolver', () => {
  let resolver: AnimeResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AnimeResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
