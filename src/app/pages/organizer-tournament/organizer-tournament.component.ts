import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Organizer} from '../../models/organizer';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpOrganizerService} from '../../services/http-organizer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrls: ['./organizer-tournament.component.css']
})
export class OrganizerTournamentComponent implements OnInit , AfterViewInit{
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;
  studentData: Organizer;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userName', 'description', 'emailAddress', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;
  constructor(private httpOrganizer: HttpOrganizerService, private router: Router) {
    this.studentData = {} as Organizer;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getAllStudents(): void {
    this.httpOrganizer.getOrganizerList().subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data);
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  navigateToTournament(studentId): void {
    this.router.navigate([`/organizers/${studentId}/free-tournaments`]).then(() => null);
  }
}
