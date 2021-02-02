import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CategorieComponent } from './Categories/categorie/categorie.component';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategorieComponent } from './Categories/add-categorie/add-categorie.component';
import { ListeRolesComponent } from './Roles/liste-roles/liste-roles.component';
import { AddRolesComponent } from './Roles/add-roles/add-roles.component';
import { ListeUserComponent } from './User/liste-user/liste-user.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { AddNewsComponent } from './News/add-news/add-news.component';
import { TestComponent } from './Test/Test.component';
import { ListNewsComponent } from './News/list-news/list-news.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';
import { DashComponent } from './dash/dash.component';
import { ChangeImageComponent } from './change-image/change-image.component';
import { ListContryComponent } from './Contry/list-contry/list-contry.component';
import { AddContryComponent } from './Contry/add-contry/add-contry.component';
import { ListTeamsComponent } from './Teams/list-teams/list-teams.component';
import { AddTeamsComponent } from './Teams/add-teams/add-teams.component';
import { ListPlayersComponent } from './Players/list-players/list-players.component';
import { AddPlayersComponent } from './Players/add-players/add-players.component';
import { AffichageTeamsComponent } from './affichage-teams/affichage-teams.component';
import { MorePlayersComponent } from './more-players/more-players.component';
import { AddTvComponent } from './Tv/add-tv/add-tv.component';
import { ListTvComponent } from './Tv/list-tv/list-tv.component';
import { AllChampionsComponent } from './Champions/all-champions/all-champions.component';
import { AddChampionsComponent } from './Champions/add-champions/add-champions.component';
import { ListMatchComponent } from './Match/list-match/list-match.component';
import { AddMatchComponent } from './Match/add-match/add-match.component';
import { MatchChampionComponent } from './Match/match-champion/match-champion.component';
import { ListMatchTvComponent } from './MatchTv/list-match-tv/list-match-tv.component';
import { AddMatchTvComponent } from './MatchTv/add-match-tv/add-match-tv.component';
import { AllTeamsChampionComponent } from './TeamsChampion/all-teams-champion/all-teams-champion.component';
import { AddTeamsChampionComponent } from './TeamsChampion/add-teams-champion/add-teams-champion.component';
import { TeamsChampionComponent } from './Match/teams-champion/teams-champion.component';
import { MatchPlayComponent } from './Match/match-play/match-play.component';
import { MatchNowComponent } from './AffichageMatch/match-now/match-now.component';
import { MatchNotPlayComponent } from './AffichageMatch/match-not-play/match-not-play.component';
import { NavMatchComponent } from './AffichageMatch/nav-match/nav-match.component';
import { PointTeamsComponent } from './AffichageMatch/point-teams/point-teams.component';
import { FinishMatchComponent } from './AffichageMatch/finish-match/finish-match.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllMessageComponent } from './all-message/all-message.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    NavComponent,
    DashBoardComponent,
    CategorieComponent,
    AddCategorieComponent,
    ListeRolesComponent,
    AddRolesComponent,
    ListeUserComponent,
    AddUserComponent,
    AddNewsComponent,
    TestComponent,
    ListNewsComponent,
    EditUserComponent,
    HomeComponent,
    BlogComponent,
    MoreNewsComponent,
    LoginComponent,
    RegistreComponent,
    DashComponent,
    ChangeImageComponent,
    ListContryComponent,
    AddContryComponent,
    ListTeamsComponent,
    AddTeamsComponent,
    ListPlayersComponent,
    AddPlayersComponent,
    AffichageTeamsComponent,
    MorePlayersComponent,
    AddTvComponent,
    ListTvComponent,
    AllChampionsComponent,
    AddChampionsComponent,
    ListMatchComponent,
    AddMatchComponent,
    MatchChampionComponent,
    ListMatchTvComponent,
    AddMatchTvComponent,
    AllTeamsChampionComponent,
    AddTeamsChampionComponent,
    TeamsChampionComponent,
    MatchPlayComponent,
    MatchNowComponent,
    MatchNotPlayComponent,
    NavMatchComponent,
    PointTeamsComponent,
    FinishMatchComponent,
    ContactComponent,
    PageNotFoundComponent,
    AllMessageComponent,
    AboutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
