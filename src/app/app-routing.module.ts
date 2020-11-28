import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizersComponent} from './pages/organizers/organizers.component';
import {PlayerHomePageComponent} from './pages/player-home-page/player-home-page.component';
import {OrganizerHomePageComponent} from './pages/organizer-home-page/organizer-home-page.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {AddTeamplayerComponent} from './pages/add-teamplayer/add-teamplayer.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AppComponent} from './app.component';
import {TournamentComponent} from './pages/tournament/tournament.component';
import {OrganizerTournamentComponent} from './pages/organizer-tournament/organizer-tournament.component';
import {TournamentPlayerAssingComponent} from './pages/tournament-player-assing/tournament-player-assing.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'playerHomePage', component: PlayerHomePageComponent },
  { path: 'organizerHomePage', component: OrganizerHomePageComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'add-teamplayer', component: AddTeamplayerComponent },
  { path: 'organizers', component: OrganizersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent},
  { path: 'organizers/:id/free-tournaments', component: TournamentComponent},
  { path: 'player/organizers', component: OrganizerTournamentComponent},
  { path: 'freeTournament/:id/players', component: TournamentPlayerAssingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent];
