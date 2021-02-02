import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { Champion } from '../Models/champion';
import { FinishDTO } from '../Models/finish-dto';
import { GoalDto } from '../Models/goal-dto';
import { LoadComboMatch } from '../Models/load-combo-match';
import { MatchDto } from '../Models/match-dto';
import { Players } from '../Models/players';
import { TeamsChampion } from '../Models/teams-champion';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  url = 'https://localhost:44334/Match/';
  fg: FormGroup;
  match: MatchDto;
  champions: Champion[];
  matchNotPlay: Champion;
  matchPlay: Champion;
  loadCmb: TeamsChampion[];
  playersAller: Players[];
  playersRetour: Players[];
  goal: GoalDto;
  finish: FinishDTO;
  affichagematchNotPlay: Champion[];
  affichagematchPlay: Champion[];
  affichagematchFinish: Champion[];
  connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/goalHubs').build();
  constructor(protected http: HttpClient,
              protected fb: FormBuilder) { }
                // tslint:disable-next-line:typedef
  formGroup(){
    this.fg = this.fb.group({
      id: 0,
      id_team_Aller: 0,
      id_team_Retour: 0,
      stade: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date_Match: null
    });
    }
    // tslint:disable-next-line:typedef
    loadCombo(idCh: number){
this.http.get(`${this.url}loadCombo/${idCh}`).toPromise().then(res => {
  this.loadCmb = res as TeamsChampion[];
  console.log(this.loadCmb);
}, ex => {
  console.log(ex);
});
    }
    // tslint:disable-next-line:typedef
    loadData(idCh){
      this.match = {
        id: this.fg.get('id').value,
        // tslint:disable-next-line:radix
        id_champions: parseInt(idCh),
        // tslint:disable-next-line:radix
        id_team_Aller: parseInt(this.fg.get('id_team_Aller').value),
        // tslint:disable-next-line:radix
        id_team_Retour: parseInt(this.fg.get('id_team_Retour').value),
        // res_TeamAller: 0,
        // res_TeamRetour: 1,
        type: this.fg.get('type').value,
        date_Match: this.fg.get('date_Match').value,
        stade: this.fg.get('stade').value
      };
    }
    // tslint:disable-next-line:typedef
    posteMatch(idCh){
      this.loadData(idCh);
      return this.http.post(`${this.url}addMatch`, this.match);
    }
    // tslint:disable-next-line:typedef
    getMatchNotPlay(id: number){
      this.http.get(`${this.url}getMatchNotPlay/${id}`).toPromise().then(ch => {
        this.matchNotPlay = ch as Champion;
      }, ex => {
        console.log(ex);
      });
    }
     // tslint:disable-next-line:typedef
     getMatchPlay(id: number){
      this.http.get(`${this.url}getMatchPlay/${id}`).toPromise().then(ch => {
        this.matchPlay = ch as Champion;
      }, ex => {
        console.log(ex);
      });
    }
// tslint:disable-next-line:typedef
EditMatch(idCh){
  this.loadData(idCh);
  return this.http.put(`${this.url}EditMatch/${this.match.id}`, this.match);
}
// tslint:disable-next-line:typedef
delete(){
  return this.http.delete(`${this.url}DeleteMatch/${this.match.id}`);
}
// tslint:disable-next-line:typedef
startMatch(id: number){
return this.http.patch(`${this.url}StartMatch/${id}`, null);
}
// tslint:disable-next-line:typedef
finishMatch(){
  return this.http.put(`${this.url}FinishMatch`, this.finish);
  }
// tslint:disable-next-line:typedef
postGoalHubs(idTeamAller: number){
  this.connexion.invoke('Goal', this.goal.idMatch, idTeamAller);
}
// tslint:disable-next-line:typedef
getResGoalHubs(){
this.connexion.on('result', (findMatch) => {
  this.affichagematchPlay.forEach(ch => {
    ch.matches.forEach(item => {
      if (item.id == findMatch.id){
        item.res_TeamAller = findMatch.res_TeamAller;
        item.res_TeamRetour = findMatch.res_TeamRetour;
        item.goals = findMatch.goals;
      }
    });
  });
  this.matchPlay.matches.forEach(match => {
    if (match.id == findMatch.id){
      match.res_TeamAller = findMatch.res_TeamAller;
      match.res_TeamRetour = findMatch.res_TeamRetour;
    }
  });
});
}
// tslint:disable-next-line:typedef
loadComboPlayersTeamAller(idTeams: number){
  return this.http.get(`${this.url}loadComboPlayers/${idTeams}`).toPromise().then(res => {
    this.playersAller = res as Players[];
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
loadComboPlayersTeamRetour(idTeams: number){
  return this.http.get(`${this.url}loadComboPlayers/${idTeams}`).toPromise().then(res => {
    this.playersRetour = res as Players[];
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
postGoal(){
return this.http.post('https://localhost:44334/Goal/posteGoal', this.goal);
}
// tslint:disable-next-line:typedef
affichageMatchNotPlay(){
  this.http.get(`${this.url}affichageMatchNotPlay`).toPromise().then(ch => {
    this.affichagematchNotPlay = ch as Champion[];
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
AffichageMatchPlay(){
  this.http.get(`${this.url}AffichageMatchPlay`).toPromise().then(ch => {
    this.affichagematchPlay = ch as Champion[];
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
AffichageMatchFinish(){
  this.http.get(`${this.url}AffichageMatchFinish`).toPromise().then(ch => {
    this.affichagematchFinish = ch as Champion[];
  }, ex => {
    console.log(ex);
  });
}
}
