import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { Champion } from '../Models/champion';
import { Teams } from '../Models/teams';
import { TeamsChampion } from '../Models/teams-champion';
import { TeamsChampionDto } from '../Models/teams-champion-dto';
import { TeamsChampions } from '../Models/TeamsChampions';

@Injectable({
  providedIn: 'root'
})
export class TeamsChampionService {
  url = 'https://localhost:44334/CollectionTeams/';
  connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/matchHubs').build();
  teamChampion: TeamsChampionDto;
  fg: FormGroup;
  teams: Teams[];
  teamsChampions: TeamsChampion[];
  champions: TeamsChampions[];
  constructor(protected http: HttpClient,
              protected fb: FormBuilder) { }
    // tslint:disable-next-line:typedef
    loadCombo(idCountry: number){
         this.http.get(`${this.url}LoadComboTeamChampion/${idCountry}`).toPromise().then(res => {
         this.teams = res as Teams[];
                }, ex => {
                  console.log(ex);
                });
              }
      // tslint:disable-next-line:typedef
       formGroup(){
        this.fg = this.fb.group({
        id: 0,
        id_Teams: 0
        });
               }
                // tslint:disable-next-line:typedef
  loadData(idChampion: number){
    this.teamChampion.id_Champion = idChampion;
    // tslint:disable-next-line:radix
    this.teamChampion.id_Teams = parseInt(this.fg.get('id_Teams').value);
      }
     // tslint:disable-next-line:typedef
  postTeamsChampion(idChampion){
    this.loadData(idChampion);
    return this.http.post(`${this.url}AddCollectionTeams`, this.teamChampion);
  }
  // tslint:disable-next-line:typedef
  getTeamsChampion(idChampion){
    this.http.get(`${this.url}GetCollectionTeams/${idChampion}`).toPromise().then(res => {
      this.teamsChampions = res as TeamsChampion[];
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  delete(){
  return this.http.delete(`${this.url}DeleteCollectionTeams/${this.teamChampion.id}`);
  }
  // tslint:disable-next-line:typedef
  GetCollectionTeamsPoint(){
    this.http.get(`${this.url}GetCollectionTeamsPoint`).toPromise().then(res => {
      this.champions = res as TeamsChampions[];
      console.log(res);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  FinishMatch(idChampion: number){
    this.connexion.invoke('FinishMatch', idChampion);
  }
  // tslint:disable-next-line:typedef
  getResultPoint(){
this.connexion.on('getResultPoint', res => {
this.champions.forEach(element => {
  if (element.id === res.id) {
    element.teams = res.teams;
  }
});
});
  }
}
