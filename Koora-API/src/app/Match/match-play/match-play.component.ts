import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from 'src/app/service/match.service';
import { NavigateService } from 'src/app/service/navigate.service';
import { TeamsChampionService } from 'src/app/service/teams-champion.service';

@Component({
  selector: 'app-match-play',
  templateUrl: './match-play.component.html',
  styleUrls: ['./match-play.component.css']
})
export class MatchPlayComponent implements OnInit {

  constructor(public service: MatchService,
              protected navigate: NavigateService,
              protected fb: FormBuilder,
              public teams: TeamsChampionService) { }
id: number;
fg: FormGroup;
  ngOnInit(): void {
    this.fg = this.fb.group({
      idPlayersAller: 0,
      idPlayersRetour: 0,
      minute: 0
    });
    this.service.goal = {
      id: 0,
      idMatch: 0,
      idPlayers: 0,
      minute: 0
    };
    this.service.matchPlay = {
      id: 0,
      matches: [],
      image: '',
      name: ''
    };
    this.service.finish = {
      idChampion: 0,
      idTeamsRetour: 0,
      idTeamsAller: 0,
      idMatch: 0
    };
    this.id = this.navigate.idMatchChampion;
    this.service.getMatchPlay(this.id);
    this.service.getResGoalHubs();
    if (this.service.connexion.state === 'Disconnected'){
    this.service.connexion.start();
    }
    this.teams.getResultPoint();
    if (this.teams.connexion.state === 'Disconnected'){
    this.teams.connexion.start();
    }
  }
 // tslint:disable-next-line:typedef
 getImageTeam(img){
  return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
}
// tslint:disable-next-line:typedef
posteGoal(idteamAller: number, idMatch: number){
const idPlayersAller = this.fg.get('idPlayersAller').value;
const idPlayersRetour = this.fg.get('idPlayersRetour').value;
this.service.goal.idMatch = idMatch;
this.service.goal.minute = this.fg.get('minute').value;
if (idPlayersAller !== 0){
// tslint:disable-next-line:radix
this.service.goal.idPlayers = parseInt(idPlayersAller);
}else{
  // tslint:disable-next-line:radix
  this.service.goal.idPlayers = parseInt(idPlayersRetour);
}
console.log(this.service.goal);
this.service.postGoal().subscribe(res => {
this.service.postGoalHubs(idteamAller);
}, ex => {
  console.log(ex);
});
}
// tslint:disable-next-line:typedef
finish(idMatch, idTeamsAller, idTeamsRetour){
this.service.finish.idChampion = this.id;
this.service.finish.idMatch = idMatch;
this.service.finish.idTeamsAller = idTeamsAller;
this.service.finish.idTeamsRetour = idTeamsRetour;
this.service.finishMatch().subscribe(res => {
  this.teams.FinishMatch(this.id);
  this.service.getMatchPlay(this.id);
}, ex => {
  console.log(ex);
});
}
}
