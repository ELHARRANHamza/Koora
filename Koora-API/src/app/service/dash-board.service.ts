import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentaireDto } from '../Models/commentaire-dto';
import { DashBoard } from '../Models/dash-board';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  url = 'https://localhost:44334/DashBoard/';
  dash: DashBoard;
  headers = new HttpHeaders({'Authorization' : `Bearer ${localStorage.getItem('token')}`});
  // tslint:disable-next-line:variable-name
  list_Cmt: CommentaireDto [];
  constructor(protected http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getDashBoard(){
   this.dash = {
     news: [],
     commentaires: [],
     users: []
   };
   this.http.get(`${this.url}getDashBoard`, {headers: this.headers}).toPromise().then(res => {
     this.dash = res as DashBoard;
   }, ex => {
     console.log(ex);
   });
  }
  // tslint:disable-next-line:typedef
  selectNews(id_News){
   this.list_Cmt = [];
    // tslint:disable-next-line:new-parens
   for (const item of this.dash.commentaires) {
      if (item.id_News == id_News){
       this.list_Cmt.unshift(item);
      }
   }
  }
}
