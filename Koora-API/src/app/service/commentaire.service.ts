import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Commentaire } from '../Models/commentaire';
import { CommentaireDto } from '../Models/commentaire-dto';
import { ReponseCommentaireDto } from '../Models/reponse-commentaire-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/commentaire_Hubs').build();
connexionReponse = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/reponseHubs').build();
commentaires: CommentaireDto[];
reponse: ReponseCommentaireDto;
url = 'https://localhost:44334/Home/';
headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  constructor(protected http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getCommentaires(idNew: number){
this.http.get(`${this.url}getCommentaire/${idNew}`, {headers: this.headers}).toPromise().then(res => {
  this.commentaires = res as CommentaireDto[];
}, ex => {
  console.log(ex);
});
  }
  // tslint:disable-next-line:typedef
  getCommentairesHub(idNews){
this.connexion.on('getCommentaires', res => {
  if (idNews == res.id_News){
  res.reponseCommentaires = [];
  this.commentaires.unshift(res as CommentaireDto);
  }
});
  }
  // tslint:disable-next-line:typedef
  postCommentaire(commentaire: string, idNews: number, userName: string){
  this.connexion.invoke('postCommentaire', commentaire, idNews, userName);
  }
  // tslint:disable-next-line:typedef
  Reponse(){
    this.connexionReponse.invoke('reponseCommentaire', this.reponse);
    }
      // tslint:disable-next-line:typedef
      getReponseCommentaire(){
    this.connexionReponse.on('getReponseCommentaire', (res) => {
     this.commentaires.forEach(cmt => {
       if (cmt.id == res.idCommentaire) {
         cmt.reponseCommentaires.unshift(res);
       }
     });
   });
    }
}
