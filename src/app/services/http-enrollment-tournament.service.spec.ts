import { TestBed } from '@angular/core/testing';

import { HttpEnrollmentTournamentService } from './http-enrollment-tournament.service';

describe('HttpEnrollmentTournamentService', () => {
  let service: HttpEnrollmentTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEnrollmentTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
