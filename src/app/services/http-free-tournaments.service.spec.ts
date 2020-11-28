import { TestBed } from '@angular/core/testing';

import { HttpFreeTournamentsService } from './http-free-tournaments.service';

describe('HttpFreeTournamentsService', () => {
  let service: HttpFreeTournamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFreeTournamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
