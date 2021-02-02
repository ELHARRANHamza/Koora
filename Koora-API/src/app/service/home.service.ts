import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Blog } from '../Models/blog';
import { ListNews } from '../Models/list-news';
import { News } from '../Models/News';
import { Players } from '../Models/players';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(protected http: HttpClient) { }
  news: ListNews[];
  findNews: News;
  blogs: Blog;
  bestPlayer: Players;
  players: Players[];
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  url = 'https://localhost:44334/Home/';
  connexion  = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/news_Hubs').build();
  // tslint:disable-next-line:typedef
  getNewsHubs(){
    // tslint:disable-next-line:only-arrow-functions
    this.connexion.on('getData', (news: ListNews[]) => {
      this.news = null;
      this.news = news;
    });
    }
    // tslint:disable-next-line:typedef
    invokeNewsHubs(){
      this.connexion.invoke('getNews');
    }
  // tslint:disable-next-line:typedef
  home(){
   this.http.get(`${this.url}home`).toPromise().then(res => {
     this.news = res as ListNews[];
   }, ex => {
     console.log(ex);
   });
  }
  // tslint:disable-next-line:typedef
  blog(){
    this.http.get(`${this.url}Blog`).toPromise().then(res => {
   this.blogs = res as Blog;
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  details(id: number){
this.http.get(`${this.url}Details/${id}`, {headers: this.headers}).toPromise().then(res => {
  this.findNews = res as News;
}, ex => {
  console.log(ex);
});
  }
  // tslint:disable-next-line:typedef
  BestPlayers(){
    this.http.get(`${this.url}BestPlayers`).toPromise().then(res => {
      this.players = res as Players[];
      this.bestPlayer = this.players[0];
    }, ex => {
      console.log(ex);
    });
  }
}
