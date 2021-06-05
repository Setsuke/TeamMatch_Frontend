import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpPlayerService } from '../../services/http-player.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css']
})
export class ModalEditProfileComponent implements OnInit {

  @Output() edit:any = new EventEmitter();
  editForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public player: any, 
              private _formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>,
              private playerService: HttpPlayerService) { }

  ngOnInit(): void {
    console.log(this.player)
    this.editForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.player.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.player.lastName, [Validators.required, Validators.pattern(pattern)]],
      cellphone: [this.player.phoneNumber, [Validators.required, Validators.pattern(pattern)]],
      email: [this.player.emailAddress, [Validators.required, Validators.pattern(pattern)]],
      gender: [this.player.gender, [Validators.required, Validators.pattern(pattern)]],
      description: [this.player.description, [Validators.required, Validators.pattern(pattern)]],
      username: [this.player.username, [Validators.required, Validators.pattern(pattern)]]
    }) 
    return form;
  }
     /**Getters */
     get firstname() { return this.editForm.controls['firstname']; }
     get lastname() { return this.editForm.controls['lastname']; }
     get cellphone() { return this.editForm.controls['cellphone']; }
     get email() { return this.editForm.controls['email']; }
     get gender() { return this.editForm.controls['gender']; }
     get description() { return this.editForm.controls['description']; }
     get username() { return this.editForm.controls['username']; }
     

    editProfile(){
      // this.player.firstName = this.firstname.value;
      // this.player.lastName = this.lastname.value;
      // this.player.phoneNumber = this.cellphone.value;
      // this.player.emailAddress = this.email.value;
      // this.player.gender = this.gender.value;
      // this.player.description = this.description.value;
      // this.player.username = this.username.value;

      let obj = {
        username: this.username.value,
        password: "1234",// se tiene que mandar una contraseña por defecto
        firstName: this.firstname.value,
        lastName: this.lastname.value,
        description: this.description.value,
        gender: this.gender.value,
        emailAddress: this.email.value,
        phoneNumber: this.cellphone.value,
        birthDate: this.player.birthDate,
        level: this.player.level,
        hoursPlayed: this.player.hoursPlayed,
        killDeathRatio: this.player.killDeathRatio
      }
      // delete this.player['createdAt'];
      // delete this.player['updatedAt'];
      // delete this.player['id'];
      // this.player['password'] = '1234';

      this.playerService.updatePlayer(6, obj).subscribe(res =>{
        this.edit.emit(obj);
        this.dialogRef.close();
        console.log(this.player)
      })
      
    }

}
