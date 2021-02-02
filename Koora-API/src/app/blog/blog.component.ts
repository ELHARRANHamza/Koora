import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { MatchService } from '../service/match.service';
import { TeamsChampionService } from '../service/teams-champion.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(public service: HomeService,
              public serviceTeams: TeamsChampionService,
              public serviceMatch: MatchService) { }
date: Date;
  ngOnInit(): void {
    this.serviceTeams.GetCollectionTeamsPoint();
    this.serviceMatch.affichageMatchNotPlay();
    this.service.blogs = {
      getNews: null,
      getCategories: null
    };
    this.service.bestPlayer = {
      id: 0,
      firstname: '',
      lastName: '',
      image: '',
      poste: '',
      date_Nais: null,
      nombre: 0,
      nationality: '',
      about: '',
      vote: '',
      team: null
    };
    this.service.blog();
    this.service.BestPlayers();
    this.service.getNewsHubs();
    if ( this.service.connexion.state === 'Disconnected') {
    this.service.connexion.start();
    }
    this.date = new Date();
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
