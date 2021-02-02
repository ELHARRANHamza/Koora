import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Champion } from '../Models/champion';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  url = 'https://localhost:44334/Champions/';
  AllChampion: Champion[];
  champion: Champion;
  formData: FormData;
  fg: FormGroup;
  file: File;
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    constructor(protected http: HttpClient,
                protected fb: FormBuilder) { }
 // tslint:disable-next-line:typedef
 getChampion(){
 this.http.get(`${this.url}GetAllChampions`, {headers: this.headers}).toPromise().then(res => {
   this.AllChampion = res as Champion[];
 }, ex => {
   console.log(ex);
 });
 }
 // tslint:disable-next-line:typedef
 postChampion(){
   this.loadData();
   return this.http.post(`${this.url}AddChampion`, this.formData, {headers: this.headers});
 }
 // tslint:disable-next-line:typedef
 loadData(){
 this.champion = {
   id: 0,
   name: this.fg.get('nom').value,
  image: '',
  matches: []
 };
 this.formData = new FormData();
 this.formData.append('name', this.champion.name);
 this.formData.append('file', this.file);
 }
 // tslint:disable-next-line:typedef
 formGroup(){
 this.fg = this.fb.group({
   id: 0,
   nom: ['', [Validators.required]]
 });
 }
 // tslint:disable-next-line:typedef
 edit(id){
   if (this.file != null) {
   this.loadData();
   }else{
     this.formData = new FormData();
     this.formData.append('name', this.fg.get('nom').value);
   }
   return this.http.put(`${this.url}EditChampion/${id}`, this.formData, {headers: this.headers});
 }
 // tslint:disable-next-line:typedef
 delete(id){
   return this.http.delete(`${this.url}DeleteChampion/${id}`, {headers: this.headers});
 }
 }
