import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/service/navigate.service';
import { PlayersService } from 'src/app/service/players.service';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {

  constructor(public service: PlayersService,
              public navigete: NavigateService) { }
message: string;
idTeams: number;
  ngOnInit(): void {
    this.message = '';
    this.idTeams = this.navigete.idTeams;
    this.service.player = {
      id: 0,
      lastName: '',
      firstname: '',
      date_Nais: null,
      about: '',
      poste: '',
      nationality: '',
      nombre: 0,
      image: '',
      file: null,
      id_team: 0,
      vote: ''
    };
    this.service.getAllPlayers(this.idTeams);
  }
// tslint:disable-next-line:typedef
Add(){
   this.message = '';
   this.service.posteplayer(this.idTeams).subscribe(res => {
     this.loadData();
     this.message = 'the operation Added Is Successfuly';
     this.service.getAllPlayers(this.idTeams);
   }, ex => {
     console.log(ex);
   });
}
// tslint:disable-next-line:typedef
loadData(){
}
// tslint:disable-next-line:typedef
Delete(){
  const id = this.service.player.id;
  this.service.delete(id).subscribe(res => {
    this.service.getAllPlayers(this.idTeams);
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/ImagePlayers/${img}`;
}
// tslint:disable-next-line:typedef
Edit(){
  const id = this.service.player.id;
  this.service.edit(id, this.idTeams).subscribe(res => {
    this.message = 'the operation Edit Is Successfuly';
    this.service.player.file = null;
    this.service.getAllPlayers(this.idTeams);
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
select(item){
  this.service.player.id = item.id;
  this.service.fg.get('firstname').setValue(item.firstname);
  this.service.fg.get('lastName').setValue(item.lastName);
  this.service.fg.get('poste').setValue(item.poste);
  this.service.fg.get('nombre').setValue(item.nombre);
  this.service.fg.get('nationality').setValue(item.nationality);
  this.service.fg.get('date_Nais').setValue(item.date_Nais);
  this.service.fg.get('about').setValue(item.about);
  this.service.player.image = this.getImage(item.image);
  this.message = '';
}
}
