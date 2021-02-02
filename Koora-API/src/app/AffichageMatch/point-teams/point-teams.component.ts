import { Component, OnInit } from '@angular/core';
import { TeamsChampionService } from 'src/app/service/teams-champion.service';

@Component({
  selector: 'app-point-teams',
  templateUrl: './point-teams.component.html',
  styleUrls: ['./point-teams.component.css']
})
export class PointTeamsComponent implements OnInit {

  constructor(public serviceTeams: TeamsChampionService) { }

  ngOnInit(): void {
    this.serviceTeams.GetCollectionTeamsPoint();
  }
  // tslint:disable-next-line:typedef
  getImageTeam(img){
    return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
  }
   // tslint:disable-next-line:typedef
   getImageChampion(img){
    return `https://localhost:44334/wwwroot/ImageChampions/${img}`;
  }
}
