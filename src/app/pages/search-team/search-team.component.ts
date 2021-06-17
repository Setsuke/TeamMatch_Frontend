import { Component, OnInit } from '@angular/core';
import { HttpTeamService } from '../../services/http-team.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.css']
})
export class SearchTeamComponent implements OnInit {

  ID_PLAYER: number = 8; // ID de ejemplo 
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','teamSize', 'levelAverage', 'hoursPlayed', 'createdAt', 'unirse'];
  constructor(private teamService: HttpTeamService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.teamService.getTeamList().subscribe((res:any)=>{
      this.dataSource.data = res.content;
    })
  }

  unirseTeam(id){
    this.teamService.joinTeam(this.ID_PLAYER, id).subscribe(res =>{ 
      if(res && res.name) {
        this._snackBar.open(`Te has unido a ${res.name}`, 'Cerrar', {duration:4000, horizontalPosition:'start'})
      }
    })
  }

}
