import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpFreeTournamentsService } from 'src/app/services/http-free-tournaments.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-selector-tournament',
  templateUrl: './selector-tournament.component.html',
  styleUrls: ['./selector-tournament.component.css']
})
export class SelectorTournamentComponent implements OnInit {
  
  constructor(private router: Router , private freeTournamentService
    
    : HttpFreeTournamentsService) { }

  ngOnInit(): void {
  }

  MyTournaments(){
    this.router.navigateByUrl('organizers/:id/free-tournaments');
  }

  JoinTournaments(){
    this.router.navigateByUrl('');
  }
}

