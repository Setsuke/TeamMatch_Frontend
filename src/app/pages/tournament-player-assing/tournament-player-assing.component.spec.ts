import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPlayerAssingComponent } from './tournament-player-assing.component';

describe('TournamentPlayerAssingComponent', () => {
  let component: TournamentPlayerAssingComponent;
  let fixture: ComponentFixture<TournamentPlayerAssingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentPlayerAssingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPlayerAssingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
