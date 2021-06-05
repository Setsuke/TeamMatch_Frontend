import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpPlayerService} from '../../services/http-player.service';
import {Player} from "../../models/player";
import { ModalEditProfileComponent} from '../modal-edit-profile/modal-edit-profile.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
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
  constructor(private tokenStorageService: TokenStorageService, private playerService: HttpPlayerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    

    // this.currentUser = this.tokenStorageService.getUser();
    // this.playerService.getPlayer(6).subscribe(data => this.player = data);
    this.playerService.getPlayer(6).subscribe(data =>{
      console.log(data)
      this.player = data;
      // this.player.username = data.username;
      // this.player.firstName = data.firstName;
      // this.player.lastName = data.lastName;
      // this.player.phoneNumber = data.phoneNumber;
      // this.player.emailAddress = data.emailAddress;
      // this.player.gender = data.gender;
      // this.player.hoursPlayed = data.hoursPlayed;
      // this.player.level = data.level;
      // this.player.createdAt = data.createdAt;
      // this.player
    })
    
    // this.player.username = 'cesartorres';
    // this.player.firstName = 'Cesar'
    // this.player.lastName = 'Torres';
    // this.player.phoneNumber = '917021657';
    // this.player.emailAddress = 'cetolara06@gmail.com';
    // this.player.gender = 'Hombre';
    // this.player.hoursPlayed = 5;
    // this.player.level = 20;
    // this.player.createdAt = '20 de mayo, 2021';
    // this.player.description = 'Soy un nuevo player';
    // this.player.birthDate = '14/11/1998';
    // this.player.killDeathRatio = 5;
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
}
