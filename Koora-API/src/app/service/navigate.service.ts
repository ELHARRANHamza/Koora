import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
isCategory: boolean;
isNews: boolean;
isDashBoard: boolean;
isUser: boolean;
isRole: boolean;
isChangeImage: boolean;
isCountry: boolean;
isTeams: boolean;
isPlayers: boolean;
isTv: boolean;
navigateDash: boolean;
navigatePageNotFound: boolean;
idTeams: number;
isChampions: boolean;
isMatch: boolean;
isMatchChampion: boolean;
isMatchTv: boolean;
// tslint:disable-next-line:variable-name
idMatchChampion: number;
idMatch: number;
idChampion: number;
idCountry: number;
isTeamChampion: boolean;
isTeamChampionMatch: boolean;
isMessage: boolean;
constructor() { }
 // tslint:disable-next-line:typedef
 Categorie(){
  this.isDashBoard = false;
  this.isNews = false;
  this.isCategory = true;
  this.isUser = false;
  this.isRole = false;
  this.isChangeImage = false;
  this.isCountry = false;
  this.isTeams = false;
  this.isPlayers = false;
  this.isTv = false;
  this.isChampions = false;
  this.isMatch = false;
  this.isMatchChampion = false;
  this.isMatchTv = false;
  this.isTeamChampion = false;
  this.isTeamChampionMatch = false;
  this.isMessage = false;
    }
    // tslint:disable-next-line:typedef
    News(){
   this.isDashBoard = false;
   this.isNews = true;
   this.isCategory = false;
   this.isUser = false;
   this.isRole = false;
   this.isChangeImage = false;
   this.isCountry = false;
   this.isTeams = false;
   this.isPlayers = false;
   this.isTv = false;
   this.isChampions = false;
   this.isMatch = false;
   this.isMatchChampion = false;
   this.isMatchTv = false;
   this.isTeamChampion = false;
   this.isTeamChampionMatch = false;
   this.isMessage = false;
          }
    // tslint:disable-next-line:typedef
    Dashboard(){
    this.isDashBoard = true;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
        }
   // tslint:disable-next-line:typedef
   User(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = true;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
        }
   // tslint:disable-next-line:typedef
   Role(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = true;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
        }
   // tslint:disable-next-line:typedef
   ChangeImage(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = true;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
        }
         // tslint:disable-next-line:typedef
   Country(idCh: number){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = true;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.idChampion = idCh;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
        }
  // tslint:disable-next-line:typedef
  Teams(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = true;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
              }
              // tslint:disable-next-line:typedef
  Players(idT){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = true;
    this.idTeams = idT;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = false;
              }
    // tslint:disable-next-line:typedef
    Tv(){
      this.isDashBoard = false;
      this.isNews = false;
      this.isCategory = false;
      this.isUser = false;
      this.isRole = false;
      this.isChangeImage = false;
      this.isCountry = false;
      this.isTeams = false;
      this.isPlayers = false;
      this.isTv = true;
      this.isChampions = false;
      this.isMatch = false;
      this.isMatchChampion = false;
      this.isMatchTv = false;
      this.isTeamChampion = false;
      this.isTeamChampionMatch = false;
      this.isMessage = false;
    }
     // tslint:disable-next-line:typedef
    Champion(){
      this.isDashBoard = false;
      this.isNews = false;
      this.isCategory = false;
      this.isUser = false;
      this.isRole = false;
      this.isChangeImage = false;
      this.isCountry = false;
      this.isTeams = false;
      this.isPlayers = false;
      this.isTv = false;
      this.isChampions = true;
      this.isMatch = false;
      this.isMatchChampion = false;
      this.isMatchTv = false;
      this.isTeamChampion = false;
      this.isTeamChampionMatch = false;
      this.isMessage = false;
    }
         // tslint:disable-next-line:typedef
    Match(){
          this.isDashBoard = false;
          this.isNews = false;
          this.isCategory = false;
          this.isUser = false;
          this.isRole = false;
          this.isChangeImage = false;
          this.isCountry = false;
          this.isTeams = false;
          this.isPlayers = false;
          this.isTv = false;
          this.isChampions = false;
          this.isMatch = true;
          this.isMatchChampion = false;
          this.isMatchTv = false;
          this.isTeamChampion = false;
          this.isTeamChampionMatch = false;
          this.isMessage = false;
        }
             // tslint:disable-next-line:typedef
    MatchChampion(idM: number){
      this.isDashBoard = false;
      this.isNews = false;
      this.isCategory = false;
      this.isUser = false;
      this.isRole = false;
      this.isChangeImage = false;
      this.isCountry = false;
      this.isTeams = false;
      this.isPlayers = false;
      this.isTv = false;
      this.isChampions = false;
      this.isMatch = false;
      this.isMatchChampion = true;
      this.idMatchChampion = idM;
      this.isMatchTv = false;
      this.isTeamChampion = false;
      this.isTeamChampionMatch = false;
      this.isMessage = false;
    }
    // tslint:disable-next-line:typedef
    MatchTv(idM: number){
      this.isDashBoard = false;
      this.isNews = false;
      this.isCategory = false;
      this.isUser = false;
      this.isRole = false;
      this.isChangeImage = false;
      this.isCountry = false;
      this.isTeams = false;
      this.isPlayers = false;
      this.isTv = false;
      this.isChampions = false;
      this.isMatch = false;
      this.isMatchChampion = false;
      this.idMatch = idM;
      this.isMatchTv = true;
      this.isTeamChampion = false;
      this.isTeamChampionMatch = false;
      this.isMessage = false;
              }
    // tslint:disable-next-line:typedef
    TeamChampion(idC: number){
      this.isDashBoard = false;
      this.isNews = false;
      this.isCategory = false;
      this.isUser = false;
      this.isRole = false;
      this.isChangeImage = false;
      this.isCountry = false;
      this.isTeams = false;
      this.isPlayers = false;
      this.isTv = false;
      this.isChampions = false;
      this.isMatch = false;
      this.isMatchChampion = false;
      this.idCountry = idC;
      this.isMatchTv = false;
      this.isTeamChampion = true;
      this.isTeamChampionMatch = false;
      this.isMessage = false;
              }
    // tslint:disable-next-line:typedef
   TeamsMatchChampion(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = true;
    this.isMessage = false;
        }
         // tslint:disable-next-line:typedef
   Message(){
    this.isDashBoard = false;
    this.isNews = false;
    this.isCategory = false;
    this.isUser = false;
    this.isRole = false;
    this.isChangeImage = false;
    this.isCountry = false;
    this.isTeams = false;
    this.isPlayers = false;
    this.isTv = false;
    this.isChampions = false;
    this.isMatch = false;
    this.isMatchChampion = false;
    this.isMatchTv = false;
    this.isTeamChampion = false;
    this.isTeamChampionMatch = false;
    this.isMessage = true;
        }
}
