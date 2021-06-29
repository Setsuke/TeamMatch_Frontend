import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { HttpOrganizerService } from 'src/app/services/http-organizer.service';
import { HttpPlayerService } from 'src/app/services/http-player.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit, AfterViewInit {
  @ViewChild('PlayerForm', {static:false})
  playerForm: NgForm;
  playerData: Player;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','firstName','lastName','gender','phoneNumber']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode: false;
  showFiller = false;

  constructor(private httpPlayerService: HttpPlayerService, private httpOrganizerService: HttpOrganizerService,
    private router:Router,private analytics: AngularFireAnalytics) {
      this.playerData = {} as Player;
     }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.retrievePlayerList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  retrievePlayerList(): void {
    this.httpPlayerService.getPlayersList().subscribe((response : any) => {
      console.log(response.content);
      this.dataSource.data = response.content;
      console.log(this.dataSource.data);
    });
  }  

  /*
  editItem(element): void {
    console.log(element);
    this.playerData = _.cloneDeep(element);
    !this.isEditMode;   
  } */

  cancelEdit(): void {
    this.isEditMode = false;
    this.playerForm.resetForm();
  }

  deleteItem(id): void {
    this.httpPlayerService.deletePlayer(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((p: Player) => {
        return p.id !== id ? p: false;
      });
    });
    console.log(this.dataSource.data);
  }

  addPlayer(): void {
    const newPlayer = {username: this.playerData.username,
    firstName: this.playerData.firstName, lastName: this.playerData.lastName,
    description: this.playerData.description, gender: this.playerData.gender,
    emailAddress: this.playerData.emailAddress, phoneNumber: this.playerData.phoneNumber,
    birthDate: this.playerData.birthDate, level: this.playerData.level, 
    hoursPlayed: this.playerData.hoursPlayed, killDeathRatio: this.playerData.killDeathRatio}
  
  this.httpPlayerService.createPlayer(newPlayer).subscribe((response: any) => {
    console.log(response);
    this.dataSource.data.push({...response});
    this.dataSource.data = this.dataSource.data.map(o =>o);
    });
  }

updatePlayer(): void {
  this.httpPlayerService.updatePlayer(this.playerData.id, this.playerData).subscribe((
    response:any) => {
      this.dataSource.data = this.dataSource.data.map((p: Player) => {
        if(p.id === response.id) {
          p = response;
        }
        return p;
      });
      this.cancelEdit();
    });
  }

  rankingEvent():void{
    this.analytics.logEvent('click_on_rank');

  }


   onSubmit(): void {
     if (this.playerForm.form.valid){
       if(this.isEditMode){
         this.updatePlayer();
       } else{
         this.addPlayer();
       }
     } else {
       console.log('Datos Inválidos');
     }
   }

   navigateToAddPlayer(): void {
     this.router.navigate(['/player/new']).then(() => null);
   }

   navigateToEditPlayer(playerId): void {
     this.router.navigate(['/player/new']).then(() => null); 
   }

   refresh(): void {
     console.log('about to reload');
     this.retrievePlayerList();
   }

}