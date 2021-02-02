import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../service/teams.service';

@Component({
  selector: 'app-affichage-teams',
  templateUrl: './affichage-teams.component.html',
  styleUrls: ['./affichage-teams.component.css']
})
export class AffichageTeamsComponent implements OnInit {

  constructor(public service: TeamsService) { }

  ngOnInit(): void {
    this.service.getAllTeams();
  }
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
}
// tslint:disable-next-line:typedef
getImageCountry(img){
  return `https://localhost:44334/wwwroot/ImageCountry/${img}`;
}
}
