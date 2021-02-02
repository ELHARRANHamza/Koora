import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-match-now',
  templateUrl: './match-now.component.html',
  styleUrls: ['./match-now.component.css']
})
export class MatchNowComponent implements OnInit {

  constructor(public service: MatchService) { }

  ngOnInit(): void {
    this.service.AffichageMatchPlay();
    this.service.getResGoalHubs();
    if (this.service.connexion.state === 'Disconnected'){
    this.service.connexion.start();
    }
  }
// tslint:disable-next-line:typedef
getImageChampion(img){
  return `https://localhost:44334/wwwroot/ImageChampions/${img}`;
  }
  // tslint:disable-next-line:typedef
  getImageTeam(img){
  return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
  }
    // tslint:disable-next-line:typedef
    getImagePlayers(img){
      return `https://localhost:44334/wwwroot/ImagePlayers/${img}`;
      }
}
