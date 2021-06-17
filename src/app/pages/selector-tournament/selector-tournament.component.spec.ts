import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTournamentComponent } from './selector-tournament.component';

describe('SelectorTournamentComponent', () => {
  let component: SelectorTournamentComponent;
  let fixture: ComponentFixture<SelectorTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
