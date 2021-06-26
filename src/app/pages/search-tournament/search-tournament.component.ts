import { Component, OnInit } from '@angular/core';
import {HttpFreeTournamentsService} from '../../services/http-free-tournaments.service';
import {HttpEnrollmentTournamentService} from '../../services/http-enrollment-tournament.service';
import {HttpProfessionalTournamentService} from '../../services/http-professional-tournament.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-tournament',
  templateUrl: './search-tournament.component.html',
  styleUrls: ['./search-tournament.component.css']
})
export class SearchTournamentComponent implements OnInit {

  ID_ORGANIZER: number = 2;
  ID_PLAYER: number = 8;
  SELECT_TYPE: number;

  dataSource = new MatTableDataSource();
  dataSourceProfessional = new MatTableDataSource();
  dataSourceEnrollment = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name',
    'description', 'prize', 'publicTournament', 'code', 'maxTeams', 'actions'];
  constructor(private freeTournamentService: HttpFreeTournamentsService,
              private enrollmentTournamentService: HttpEnrollmentTournamentService,
              private professionalTournamentService: HttpProfessionalTournamentService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  selectType(event){
    this.SELECT_TYPE = event.value;
    if(this.SELECT_TYPE == 1) {
      this.freeTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
        this.dataSource.data = res.content;
      })

      this.professionalTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
        this.dataSourceProfessional = res.content;
      })

      this.enrollmentTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
        this.dataSourceEnrollment = res.content;
      })
    } else if(this.SELECT_TYPE == 2){
        this.freeTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
          this.dataSource.data = res.content;
        })
    } else if(this.SELECT_TYPE == 3){
        this.professionalTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
          this.dataSourceProfessional = res.content;
        })
    } else if(this.SELECT_TYPE == 4){
        this.professionalTournamentService.getListByOrganizerId(this.ID_ORGANIZER).subscribe((res:any) =>{
          this.dataSourceEnrollment = res.content;
        })
    }
  }

  joinFreeTournament(id){
    console.log('join free', id)
    this.freeTournamentService.joinPlayertoTournament(this.ID_PLAYER, id).subscribe( res =>{
      // console.log(res);
      if(res && res.name) {
        this._snackBar.open(`Te has unido a ${res.name}`, 'Cerrar', {duration:4000, horizontalPosition:'start'})
      }
    })
  }

  joinProfessionalTournament(id){
    console.log('join pro', id)
  }

  joinEnrollmentTournament(id){
    console.log('join enroll', id)
  }

}
