import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../Models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
 url = 'https://localhost:44334/Country/';
 Allcountry: Country[];
 contry: Country;
 formData: FormData;
 fg: FormGroup;
 file: File;
 headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
   constructor(protected http: HttpClient,
               protected fb: FormBuilder) { }
// tslint:disable-next-line:typedef
getCountry(){
this.http.get(`${this.url}getAllContry`, {headers: this.headers}).toPromise().then(res => {
  this.Allcountry = res as Country[];
}, ex => {
  console.log(ex);
});
}
// tslint:disable-next-line:typedef
postCountry(){
  this.loadData();
  return this.http.post(`${this.url}AddCountry`, this.formData, {headers: this.headers});
}
// tslint:disable-next-line:typedef
loadData(){
this.contry = {
  id: 0,
  name: this.fg.get('name').value,
  image: '',
  teams: []
};
this.formData = new FormData();
this.formData.append('name', this.contry.name);
this.formData.append('file', this.file);
}
// tslint:disable-next-line:typedef
formGroup(){
this.fg = this.fb.group({
  id: 0,
  name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
});
}
// tslint:disable-next-line:typedef
edit(id){
  if (this.file != null) {
  this.loadData();
  }else{
    this.formData = new FormData();
    this.formData.append('name', this.fg.get('name').value);
  }
  return this.http.put(`${this.url}EditCountry/${id}`, this.formData, {headers: this.headers});
}
// tslint:disable-next-line:typedef
delete(id){
  return this.http.delete(`${this.url}DeleteCountry/${id}`, {headers: this.headers});
}
}
