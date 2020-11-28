import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Player} from '../../models/player';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpPlayerService} from '../../services/http-player.service';

@Component({
  selector: 'app-tournament-player-assing',
  templateUrl: './tournament-player-assing.component.html',
  styleUrls: ['./tournament-player-assing.component.css']
})
export class TournamentPlayerAssingComponent implements OnInit, AfterViewInit {

  @ViewChild('studentForm', {static: false})
  studentForm: NgForm;
  playerData: Player;
  studentId: number;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'description', 'gender', 'level', 'hoursPlayed', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpPlayer: HttpPlayerService , private router: Router, private route: ActivatedRoute) {
    this.playerData = {} as Player;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.studentId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.getAllPlayers(id);
        this.isEditMode = true;
        return id;
      } else {
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllPlayers(id): void {
    this.httpPlayer.getListByTournamentId(id).subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data);
    });
  }
  navigateToSelectedTournament(tournamentId): void {
    this.router.navigate([`/player/${tournamentId}/tournament`]).then(() => null);
  }

}
