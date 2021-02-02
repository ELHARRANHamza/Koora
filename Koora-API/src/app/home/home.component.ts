import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { MatchService } from '../service/match.service';
import { NavigateService } from '../service/navigate.service';
import { TeamsChampionService } from '../service/teams-champion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: HomeService,
              protected navigate: NavigateService,
              public serviceMatch: MatchService,
              public serviceTeams: TeamsChampionService) { }
date: Date;
  ngOnInit(): void {
    this.serviceMatch.affichagematchNotPlay = [];
    this.serviceTeams.GetCollectionTeamsPoint();
    this.serviceMatch.affichageMatchNotPlay();
    this.serviceMatch.AffichageMatchPlay();
    this.serviceMatch.getResGoalHubs();
    if (this.serviceMatch.connexion.state === 'Disconnected') {
    this.serviceMatch.connexion.start();
    }
    this.service.home();
    this.service.getNewsHubs();
    if (this.service.connexion.state === 'Disconnected') {
    this.service.connexion.start();
    }
    this.serviceTeams.getResultPoint();
    if (this.serviceTeams.connexion.state === 'Disconnected') {
    this.serviceTeams.connexion.start();
    }
    this.navigate.navigateDash = false;
    this.navigate.navigatePageNotFound = false;
    this.date = new Date();
    this.service.BestPlayers();
  }
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/News/${img}`;
  }
 // tslint:disable-next-line:typedef
 getImageTeam(img){
  return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
}
 // tslint:disable-next-line:typedef
 getImageChampion(img){
  return `https://localhost:44334/wwwroot/ImageChampions/${img}`;
}
 // tslint:disable-next-line:typedef
 getImagePlayers(img){
  return `https://localhost:44334/wwwroot/ImagePlayers/${img}`;
}
}
