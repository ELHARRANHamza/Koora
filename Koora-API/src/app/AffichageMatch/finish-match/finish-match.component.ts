import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-finish-match',
  templateUrl: './finish-match.component.html',
  styleUrls: ['./finish-match.component.css']
})
export class FinishMatchComponent implements OnInit {

  constructor(public service: MatchService) { }

  ngOnInit(): void {
    this.service.AffichageMatchFinish();
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
