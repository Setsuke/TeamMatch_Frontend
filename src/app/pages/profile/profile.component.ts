import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpPlayerService} from '../../services/http-player.service';
import {Player} from "../../models/player";
import { ModalEditProfileComponent} from '../modal-edit-profile/modal-edit-profile.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ID_PLAYER: number = 8;
  currentUser: any;
  progress_bar: boolean = false;
  player: Player = {
    username:'',
    firstName: '',
    lastName: '',
    emailAddress: '',
    birthDate: '',
    createdAt: '',
    description: '',
    gender: '',
    hoursPlayed: 0,
    id: null,
    killDeathRatio: 0,
    level: 0,
    phoneNumber: '',
    updatedAt: ''


  };
  constructor(private tokenStorageService: TokenStorageService, private playerService: HttpPlayerService,public dialog: MatDialog
    ,private analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    

    // this.currentUser = this.tokenStorageService.getUser();
    // this.playerService.getPlayer(6).subscribe(data => this.player = data);
    this.progress_bar = true;
    setTimeout(()=>{
      this.playerService.getPlayer(this.ID_PLAYER).subscribe(data =>{
        this.progress_bar = false;
        console.log(data)
        this.player = data;
      })
    },1000)
    
    console.log(this.player);
  }

  abrirModalEditar(){
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '600px',
      data: this.player
    })

    dialogRef.componentInstance.edit.subscribe(playerUpdate =>{
      console.log('aqui', playerUpdate)
      this.player = playerUpdate
    })
  }

  changeBodyBg(color){

    this.analytics.logEvent('change_banner_color',{'color':color});
    document.body.style.background = color;
  }

  changeHeadingBg(ruta){
    document.getElementById("heading").style.background = ruta;
  }

 
}
