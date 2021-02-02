import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/service/navigate.service';
import { TeamsChampionService } from 'src/app/service/teams-champion.service';

@Component({
  selector: 'app-teams-champion',
  templateUrl: './teams-champion.component.html',
  styleUrls: ['./teams-champion.component.css']
})
export class TeamsChampionComponent implements OnInit {

  constructor(public service: TeamsChampionService,
              public navigate: NavigateService) { }
idCh: number;
cp: number;
  ngOnInit(): void {
    this.idCh =  this.navigate.idMatchChampion;
    this.service.getTeamsChampion(this.idCh);
  }
  // tslint:disable-next-line:typedef
  getImage(img){
    return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
    }
    // tslint:disable-next-line:typedef
    rank(): number{
      let nb = 1;
      nb++;
      return nb;
    }
}
