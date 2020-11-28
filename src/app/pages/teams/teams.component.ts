import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../models/team';
import {NgForm} from '@angular/forms';
import {HttpTeamService} from '../../services/http-team.service';
import * as _ from 'lodash';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {HttpPlayerService} from '../../services/http-player.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  teamForm: NgForm;
  teamData: Team;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'teamName', 'teamSize', 'levelAverage', 'hoursPlayed'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpTeamService: HttpTeamService, private httpPlayerService: HttpPlayerService,
              private router: Router) {
    this.teamData = {} as Team;
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.retrieveTeamList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  retrieveTeamList(): void {
    this.httpTeamService.getTeamList().subscribe((response: any) => {
      console.log(response.content);
      this.dataSource.data = response.content;
      console.log(this.dataSource.data);
    });
  }

  editItem(element): void {
    console.log(element);
    this.teamData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.teamForm.resetForm();
  }
  deleteItem(id): void {
    this.httpTeamService.deleteTeam(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Team) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addTeam(): void {
    const newTeam = {teamName: this.teamData.name, teamSize: this.teamData.teamSize,
      levelAverage: this.teamData.levelAverage, hoursPlayed: this.teamData.hoursPlayed};
    this.httpTeamService.createTeam(newTeam).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateTeam(): void {
    this.httpTeamService.updateTeam(this.teamData.id, this.teamData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Team) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.teamForm.form.valid) {
      if (this.isEditMode) {
        this.updateTeam();
      } else {
        this.addTeam();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddTeam(): void {
    this.router.navigate(['/add-teamplayer']).then(() => null);
  }
  navigateToEditTeam(teamId): void {
    this.router.navigate([`/teams/${teamId}`]).then(() => null);
  }
  refresh(): void {
    console.log('about to reload');
    this.retrieveTeamList();
  }

}
