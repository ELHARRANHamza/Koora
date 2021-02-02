import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/service/navigate.service';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent implements OnInit {

  constructor(public service: TeamsService,
              public navigate: NavigateService) { }
message: string;
colapse: string;
  ngOnInit(): void {
    this.message = '';
    this.colapse = 'colapsee';
    this.service.teams = {
      id: 0,
      id_Cat: 0,
      id_Country: 0,
      file: null,
      nom: '',
      logo: ''
    };
    this.service.getAllTeams();
  }
// tslint:disable-next-line:typedef
loadData(){
  this.message = '';
  this.service.teams = {
    id: 0,
    id_Cat: 0,
    id_Country: 0,
    file: null,
    nom: '',
    logo: ''
  };
  this.service.fg.get('nom').setValue('');
  this.service.fg.get('id_Country').setValue(0);
  this.service.fg.get('id_Cat').setValue(0);
}
// tslint:disable-next-line:typedef
select(country, item){
  this.service.teams.id = item.id;
  this.service.fg.get('nom').setValue(item.nom);
  this.service.fg.get('id_Country').setValue(country.id);
  this.service.fg.get('id_Cat').setValue(item.categorie.id);
  this.service.teams.logo = this.getImage(item.logo);
  this.message = '';
}
// tslint:disable-next-line:typedef
Add(){
  this.message = '';
  this.service.posteTeams().subscribe(res => {
    this.loadData();
    this.message = 'the operation Added Is Successfuly';
    this.service.getAllTeams();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
Delete(){
  const id = this.service.teams.id;
  this.service.delete(id).subscribe(res => {
    this.service.getAllTeams();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
}
// tslint:disable-next-line:typedef
getImageCountry(img){
  return `https://localhost:44334/wwwroot/ImageCountry/${img}`;
}
// tslint:disable-next-line:typedef
Edit(){
  const id = this.service.teams.id;
  this.service.edit(id).subscribe(res => {
    this.message = 'the operation Edit Is Successfuly';
    this.service.teams.file = null;
    this.service.getAllTeams();
  }, ex => {
    console.log(ex);
  });
}
}
