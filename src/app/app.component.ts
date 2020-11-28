// app.component.ts
//  Main Application View
import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TeamMatchFrontEnd';
  private roles: string[];
  isLoggedIn = false;
  userType: string;
  username: string;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userType = localStorage.getItem('user_type');
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  toHomePage(): void {
    if (this.userType === 'player'){
      this.router.navigate(['/playerHomePage']);
    }
    else {
      this.router.navigate(['/organizerHomePage']);
     }
  }
}
