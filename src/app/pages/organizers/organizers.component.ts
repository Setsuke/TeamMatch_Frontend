import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpOrganizerService} from '../../services/http-organizer.service';
import {Organizer} from '../../models/organizer';
import * as _ from 'lodash';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {HttpPlayerService} from "../../services/http-player.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.css']
})
export class OrganizersComponent implements OnInit, AfterViewInit {
  @ViewChild('organizerForm', { static: false })
  organizerForm: NgForm;
  organizerData: Organizer;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'phoneNumber'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpOrganizerService: HttpOrganizerService, private httpPlayerService: HttpPlayerService,
              private router: Router) {
    this.organizerData = {} as Organizer;
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.retrieveOrganizerList();
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


  retrieveOrganizerList(): void {
    this.httpOrganizerService.getOrganizerList().subscribe((response: any) => {
      console.log(response.content);
      this.dataSource.data = response.content;
      console.log(this.dataSource.data);
    });
  }

  editItem(element): void {
    console.log(element);
    this.organizerData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.organizerForm.resetForm();
  }
  deleteItem(id): void {
    this.httpOrganizerService.deleteOrganizer(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Organizer) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addOrganizer(): void {
    const newOrganizer = {username: this.organizerData.username, password: this.organizerData.password,
      firstName: this.organizerData.firstName, lastName: this.organizerData.lastName,
      description: this.organizerData.description, gender: this.organizerData.gender,
      emailAddress: this.organizerData.emailAddress, phoneNumber: this.organizerData.phoneNumber,
      birthDate: this.organizerData.birthDate};
    this.httpOrganizerService.createOrganizer(newOrganizer).subscribe((response: any) => {
      console.log(response);
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateOrganizer(): void {
    this.httpOrganizerService.updateOrganizer(this.organizerData.id, this.organizerData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Organizer) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.organizerForm.form.valid) {
      if (this.isEditMode) {
        this.updateOrganizer();
      } else {
        this.addOrganizer();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddOrganizer(): void {
    this.router.navigate(['/organizer/new']).then(() => null);
  }
  navigateToEditOrganizer(organizerId): void {
    this.router.navigate([`/organizers/${organizerId}`]).then(() => null);
  }
  refresh(): void {
    console.log('about to reload');
    this.retrieveOrganizerList();
  }

}
