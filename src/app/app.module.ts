import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { PlayersComponent } from './pages/players/players.component';
import { OrganizersComponent } from './pages/organizers/organizers.component';
import { TeamsComponent } from './pages/teams/teams.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddTeamplayerComponent } from './pages/add-teamplayer/add-teamplayer.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog'
import {TournamentComponent} from './pages/tournament/tournament.component';
import {OrganizerTournamentComponent} from './pages/organizer-tournament/organizer-tournament.component';
import { TournamentPlayerAssingComponent } from './pages/tournament-player-assing/tournament-player-assing.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './pages/login/login.component';
import { ModalEditProfileComponent } from './pages/modal-edit-profile/modal-edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PlayersComponent,
    OrganizersComponent,
    TeamsComponent,
    AddTeamplayerComponent,
    ProfileComponent,
    RegisterComponent,
    TournamentComponent,
    OrganizerTournamentComponent,
    TournamentPlayerAssingComponent,
    LoginComponent,
    ModalEditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [ModalEditProfileComponent]
})
export class AppModule { }
