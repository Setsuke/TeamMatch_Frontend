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
import { MatListModule} from '@angular/material/list';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog'
import { TournamentComponent} from './pages/tournament/tournament.component';
import { OrganizerTournamentComponent} from './pages/organizer-tournament/organizer-tournament.component';
import { TournamentPlayerAssingComponent } from './pages/tournament-player-assing/tournament-player-assing.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './pages/login/login.component';
import { ModalEditProfileComponent } from './pages/modal-edit-profile/modal-edit-profile.component';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';
import { SearchTeamComponent } from './pages/search-team/search-team.component';
import { SelectorTournamentComponent } from './pages/selector-tournament/selector-tournament.component';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire';
const config = {
  apiKey: "AIzaSyDFOAiFcpCzyDzwqflT85nbZAKKqI2lkDE",
  authDomain: "team-match-63158.firebaseapp.com",
  projectId: "team-match-63158",
  storageBucket: "team-match-63158.appspot.com",
  messagingSenderId: "300317231376",
  appId: "1:300317231376:web:d9902bdb8ed79ed1337d95",
  measurementId: "G-HFP0JN9XJY"
};

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
    HomeComponent,
    SearchTournamentComponent,
    SearchTeamComponent,
    SelectorTournamentComponent,

  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAnalyticsModule,
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
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [ModalEditProfileComponent]
})
export class AppModule { }
