import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tv } from '../Models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  url = 'https://localhost:44334/Tv/';
  AllTv: Tv[];
  tv: Tv;
  formData: FormData;
  fg: FormGroup;
  file: File;
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    constructor(protected http: HttpClient,
                protected fb: FormBuilder) { }
 // tslint:disable-next-line:typedef
 getTv(){
 this.http.get(`${this.url}GetAllTv`, {headers: this.headers}).toPromise().then(res => {
   this.AllTv = res as Tv[];
 }, ex => {
   console.log(ex);
 });
 }
 // tslint:disable-next-line:typedef
 postTv(){
   this.loadData();
   return this.http.post(`${this.url}AddTv`, this.formData, {headers: this.headers});
 }
 // tslint:disable-next-line:typedef
 loadData(){
 this.tv = {
   id: 0,
   nom: this.fg.get('nom').value,
  logo: ''
 };
 this.formData = new FormData();
 this.formData.append('nom', this.tv.nom);
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
     this.formData.append('nom', this.fg.get('nom').value);
   }
   return this.http.put(`${this.url}EditTv/${id}`, this.formData, {headers: this.headers});
 }
 // tslint:disable-next-line:typedef
 delete(id){
   return this.http.delete(`${this.url}DeleteTv/${id}`, {headers: this.headers});
 }
 }
