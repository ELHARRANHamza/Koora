import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../Models/country';
import { Players } from '../Models/players';
import { PlayersDTO } from '../Models/players-dto';
import { Teams } from '../Models/teams';
import { TeamsDto } from '../Models/teams-dto';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
listPlayers: Players[];
teams: Teams[];
formData: FormData;
fg: FormGroup;
player: PlayersDTO;
url = 'https://localhost:44334/Players/';
  constructor(protected http: HttpClient,
              protected fb: FormBuilder) { }
headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  // tslint:disable-next-line:typedef
getAllPlayers(id){
this.http.get(`${this.url}getAllPlayers/${id}`, {headers: this.headers}).toPromise().then(res => {
      this.listPlayers = res as Players[];
    }, ex => {
      console.log(ex);
    });
   }
     // tslint:disable-next-line:typedef
  posteplayer(idTeam){
    this.loadData(idTeam);
    return this.http.post(`${this.url}AddPlayers`, this.formData, {headers: this.headers});
  }
  // tslint:disable-next-line:typedef
  formGroup(){
    this.fg = this.fb.group({
      id: 0,
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      lastName: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      image: '',
      poste: ['', [Validators.required]],
      nombre: [0, [Validators.required]],
      nationality: ['', [Validators.required]],
      date_Nais: null,
      about: ['', [Validators.required , Validators.minLength(20)]]
    });
    }
  // tslint:disable-next-line:typedef
  loadData(id){
    this.player.firstname = this.fg.get('firstname').value;
    this.player.lastName = this.fg.get('lastName').value;
    this.player.poste = this.fg.get('poste').value;
    this.player.nombre = this.fg.get('nombre').value;
    this.player.nationality = this.fg.get('nationality').value;
    this.player.date_Nais = this.fg.get('date_Nais').value;

    this.player.about = this.fg.get('about').value;
    // this.player.vote = this.fg.get('vote').value;
    this.player.id_team = id;

    this.formData = new FormData();
    this.formData.append('firstname', this.player.firstname);
    this.formData.append('lastName', this.player.lastName);
    this.formData.append('poste', this.player.poste);
    this.formData.append('nombre', this.player.nombre.toString());
    this.formData.append('nationality', this.player.nationality);
    this.formData.append('file', this.player.file);
    this.formData.append('date_Nais', this.player.date_Nais.toString());
    this.formData.append('about', this.player.about);
    this.formData.append('id_team', this.player.id_team.toString());
    this.formData.append('vote', 'Best');
  }
  // tslint:disable-next-line:typedef
edit(id, idTeam){
  if (this.player.file != null) {
  this.loadData(idTeam);
  }else{
    this.formData = new FormData();
    this.formData.append('firstname', this.player.firstname);
    this.formData.append('lastName', this.player.lastName);
    this.formData.append('poste', this.player.poste);
    this.formData.append('nombre', this.player.nombre.toString());
    this.formData.append('nationality', this.player.nationality);
    this.formData.append('date_Nais', this.player.date_Nais.toString());
    this.formData.append('about', this.player.about);
    this.formData.append('vote', 'Best');
  }
  return this.http.put(`${this.url}EditPlayers/${id}`, this.formData, {headers: this.headers});
}
// tslint:disable-next-line:typedef
delete(id){
  return this.http.delete(`${this.url}DeletePlayers/${id}`, {headers: this.headers});
}
}
