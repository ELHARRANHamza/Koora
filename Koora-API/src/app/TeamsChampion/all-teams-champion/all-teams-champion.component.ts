import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/service/navigate.service';
import { TeamsChampionService } from 'src/app/service/teams-champion.service';

@Component({
  selector: 'app-all-teams-champion',
  templateUrl: './all-teams-champion.component.html',
  styleUrls: ['./all-teams-champion.component.css']
})
export class AllTeamsChampionComponent implements OnInit {

  constructor(public service: TeamsChampionService,
              public navigate: NavigateService) { }
  message: string;
  idChampion: number;
  ngOnInit(): void {
    this.message = '';
    this.service.teamChampion = {
    id: 0,
    id_Champion: 0,
    id_Teams: 0
  };
    this.idChampion =  this.navigate.idChampion;
    this.service.getTeamsChampion(this.idChampion);
  }
  // tslint:disable-next-line:typedef
  loadData(){
    this.message = '';
    this.service.teamChampion = {
      id: 0,
      id_Teams: 0,
      id_Champion: 0
    };
    this.service.fg.get('id_Teams').setValue(0);
  }
   // tslint:disable-next-line:typedef
   Add(){
    this.message = '';
    this.service.postTeamsChampion(this.idChampion).subscribe(res => {
      this.loadData();
      this.message = 'the operation Added Is Successfuly';
      this.service.getTeamsChampion(this.idChampion);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.teamChampion.id = item.id;
    this.service.teamChampion.id_Teams = item.team.id;
    this.service.fg.get('id_Teams').setValue(item.team.id);
    this.message = '';
  }
  // tslint:disable-next-line:typedef
  Delete(){
    this.service.delete().subscribe(res => {
      this.service.getTeamsChampion(this.idChampion);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getImage(img){
    return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
    }
  }
