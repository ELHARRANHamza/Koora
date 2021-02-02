import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-match-champion',
  templateUrl: './match-champion.component.html',
  styleUrls: ['./match-champion.component.css']
})
export class MatchChampionComponent implements OnInit {

  constructor(public navigate: NavigateService,
              public service: MatchService) { }
id: number;
  ngOnInit(): void {
     this.service.matchNotPlay = {
      id: 0,
      matches: [],
      image: '',
      name: ''
    };
     this.id = this.navigate.idMatchChampion;
     this.service.getMatchNotPlay(this.id);
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
  startMatch(id: number){
this.service.startMatch(id).subscribe(res => {
  this.service.getMatchNotPlay(this.id);
}, ex => {
  console.log(ex);
});
  }
}
