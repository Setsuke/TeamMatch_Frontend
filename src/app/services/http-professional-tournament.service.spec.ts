import { TestBed } from '@angular/core/testing';

import { HttpProfessionalTournamentService } from './http-professional-tournament.service';

describe('HttpProfessionalTournamentService', () => {
  let service: HttpProfessionalTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProfessionalTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
