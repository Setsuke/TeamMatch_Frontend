import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPlayersComponent } from './ranking-players.component';

describe('RankingPlayersComponent', () => {
  let component: RankingPlayersComponent;
  let fixture: ComponentFixture<RankingPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
