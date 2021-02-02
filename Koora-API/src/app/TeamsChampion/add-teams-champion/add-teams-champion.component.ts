import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/service/navigate.service';
import { TeamsChampionService } from 'src/app/service/teams-champion.service';

@Component({
  selector: 'app-add-teams-champion',
  templateUrl: './add-teams-champion.component.html',
  styleUrls: ['./add-teams-champion.component.css']
})
export class AddTeamsChampionComponent implements OnInit {

  constructor(public service: TeamsChampionService,
              public navigate: NavigateService) { }

  ngOnInit(): void {
    this.service.teamChampion = {
      id: 0,
      id_Champion: 0,
      id_Teams: 0
    };
    this.service.loadCombo(this.navigate.idCountry);
    this.service.formGroup();
  }

}
