import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../Models/country';
import { LoadComboTeams } from '../Models/load-combo-teams';
import { Teams } from '../Models/teams';
import { TeamsDto } from '../Models/teams-dto';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
listTeams: Country[];
loadCmb: LoadComboTeams;
teams: TeamsDto;
fg: FormGroup;
formData: FormData;
url = 'https://localhost:44334/Teams/';
headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  constructor(protected http: HttpClient,
              protected fb: FormBuilder) { }
  // tslint:disable-next-line:typedef
  loadCombo(){
    this.http.get(`${this.url}laodData`, { headers: this.headers}).toPromise().then(res => {
      this.loadCmb = res as LoadComboTeams;
      console.log(this.loadCmb);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getAllTeams(){
   this.http.get(`${this.url}getAllTeams`, {headers: this.headers}).toPromise().then(res => {
     const teamss = res as Country[];
     this.listTeams = [];
     teamss.forEach(country => {
       if (country.teams.length > 0) {
          this.listTeams.unshift(country);
        }
     });
   }, ex => {
     console.log(ex);
   });
  }
  // tslint:disable-next-line:typedef
  posteTeams(){
    this.loadData();
    return this.http.post(`${this.url}AddTeams`, this.formData, { headers: this.headers});
  }
  // tslint:disable-next-line:typedef
loadData(){
    this.teams.nom = this.fg.get('nom').value;
    this.teams.id_Country = this.fg.get('id_Country').value;
    this.teams.id_Cat = this.fg.get('id_Cat').value;
    this.formData = new FormData();
    this.formData.append('nom', this.teams.nom);
    this.formData.append('file', this.teams.file);
    this.formData.append('id_Country', this.teams.id_Country.toString());
    this.formData.append('id_Cat', this.teams.id_Cat.toString());
  }
  // tslint:disable-next-line:typedef
formGroup(){
  this.fg = this.fb.group({
    id: 0,
    nom: ['', [Validators.required, Validators.minLength(3)]],
    logo: '',
    id_Country: 0,
    id_Cat: 0
  });
  }
  // tslint:disable-next-line:typedef
edit(id){
  if (this.teams.file != null) {
  this.loadData();
  }else{
    this.formData = new FormData();
    this.formData.append('nom', this.fg.get('nom').value);
    this.formData.append('id_Country', this.fg.get('id_Country').value);
    this.formData.append('id_Cat', this.fg.get('id_Cat').value);
  }
  return this.http.put(`${this.url}EditTeams/${id}`, this.formData, { headers: this.headers});
}
// tslint:disable-next-line:typedef
delete(id){
  return this.http.delete(`${this.url}DeleteTeams/${id}`, { headers: this.headers});
}
}
