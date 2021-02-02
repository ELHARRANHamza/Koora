import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { ListNews } from '../Models/list-news';
import { News } from '../Models/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

constructor(protected http: HttpClient,
            public fb: FormBuilder) { }
url = 'https://localhost:44334/News/';
news: News;
fg: FormGroup;
file: File;
formdata: FormData;
selectedValues: number;
// tslint:disable-next-line:variable-name
list_News: ListNews[];
connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/news_Hubs').build();
// tslint:disable-next-line:typedef
headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
// tslint:disable-next-line:typedef
getNewsHubs(){
// tslint:disable-next-line:only-arrow-functions
this.connexion.on('getData', (news: ListNews[]) => {
  this.list_News = null;
  this.list_News = news;
});
}
// tslint:disable-next-line:typedef
invokeNewsHubs(){
  this.connexion.invoke('getNews');
}
// tslint:disable-next-line:typedef
postNews(){
  this.formData();
  return this.http.post(`${this.url}posteNews`, this.formdata, {headers: this.headers});
}
// tslint:disable-next-line:typedef
getNews(){
this.http.get(`${this.url}getNews`, {headers: this.headers}).toPromise().then(res => {
  this.list_News = res as ListNews[];
}, ex => {
console.log(ex);
});
}
// tslint:disable-next-line:typedef
deleteNews(id: number){
  return this.http.delete(`${this.url}deleteNews/${id}`, {headers: this.headers});
}
// tslint:disable-next-line:typedef
editNews(id: number){
  this.formData();
  return this.http.put(`${this.url}editNews/${id}`, this.formdata, {headers: this.headers});
}
// tslint:disable-next-line:typedef
formData(){
 // this.connexion.start();
 this.formdata = new FormData();
 this.formdata.append('file', this.file);
 this.formdata.append('Titre', this.news.titre);
 this.formdata.append('Description', this.news.description);
// tslint:disable-next-line:align
this.formdata.append('id_Cat', this.news.id_Cat.toString());
}
}
