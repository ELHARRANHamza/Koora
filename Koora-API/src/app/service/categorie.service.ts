import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Categorie } from '../Models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categories: Categorie[];
  categorie: Categorie;
  url = 'https://localhost:44334/Categorie/';
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  constructor(protected http: HttpClient) { }
  // tslint:disable-next-line:typedef
  get(){
    this.http.get(`${this.url}liste`, {headers: this.headers}).toPromise().then(res => {
      this.categories = res as Categorie[];
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  post(){
    return this.http.post(`${this.url}add`, this.categorie, {headers: this.headers});
  }
  // tslint:disable-next-line:typedef
  put(id){
    return this.http.put(`${this.url}edit/${id}`, this.categorie, {headers: this.headers});
  }
  // tslint:disable-next-line:typedef
  Delete(id){
    return this.http.delete(`${this.url}delete/${id}`, {headers: this.headers});
  }
}
