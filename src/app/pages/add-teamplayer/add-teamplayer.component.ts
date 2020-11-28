import { Component, OnInit } from '@angular/core';
import { TeamsComponent} from '../teams/teams.component';
import {Team} from '../../models/team';
@Component({
  selector: 'app-add-teamplayer',
  templateUrl: './add-teamplayer.component.html',
  styleUrls: ['./add-teamplayer.component.css']
})
export class AddTeamplayerComponent implements OnInit {
team = new Team();
  dataarray = [];
  constructor() { }

  ngOnInit(): void {
    this.team = new Team();
    this.dataarray.push(this.team);
  }
  addForm()
  {
    this.team = new Team();
    this.dataarray.push(this.team);
  }
  onSubmit()
  {
    console.log(this.dataarray);
  }
  removeForm(index)
  {
    this.dataarray.splice(index);
  }
}
