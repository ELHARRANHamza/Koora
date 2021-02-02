import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-match-not-play',
  templateUrl: './match-not-play.component.html',
  styleUrls: ['./match-not-play.component.css']
})
export class MatchNotPlayComponent implements OnInit {

  constructor(public service: MatchService) { }
id: number;
ngOnInit(): void {
this.service.affichageMatchNotPlay();
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
getImageChanel(img){
  return `https://localhost:44334/wwwroot/ImageTv/${img}`;
  }
}
