import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.css']
})
export class ListMatchComponent implements OnInit {
  message: string;
  constructor(public service: MatchService,
              public navigate: NavigateService) { }
idCh: number;
  ngOnInit(): void {
    this.message = '';
    this.service.match = {
    id: 0,
    id_champions: 0,
    id_team_Aller: 0,
    id_team_Retour: 0,
    // res_TeamAller: null,
    // res_TeamRetour: null,
    type: '',
    date_Match: null,
    stade: ''
  };
    this.idCh =  this.navigate.idMatchChampion;
    this.service.getMatchNotPlay(this.idCh);
  }
  // tslint:disable-next-line:typedef
loadData(){
  this.message = '';
  this.service.match = {
    id: 0,
    id_champions: 0,
    id_team_Aller: 0,
    id_team_Retour: 0,
    // res_TeamAller: null,
    // res_TeamRetour: null,
    type: '',
    date_Match: null,
    stade: ''
  };
  this.service.fg.get('type').setValue('');
  this.service.fg.get('id_team_Aller').setValue(0);
  this.service.fg.get('id_team_Retour').setValue(0);
  this.service.fg.get('date_Match').setValue(null);
  this.service.fg.get('stade').setValue('');
}
// tslint:disable-next-line:typedef
select(item){
  this.service.match.id = item.id;
  this.service.fg.get('id').setValue(item.id);
  this.service.fg.get('type').setValue(item.type);
  this.service.fg.get('id_team_Aller').setValue(item.team_Aller.id);
  this.service.fg.get('id_team_Retour').setValue(item.team_Retour.id);
  this.service.fg.get('date_Match').setValue(item.date_Match);
  this.service.fg.get('stade').setValue(item.stade);
  this.message = '';
}
// tslint:disable-next-line:typedef
Add(){
   this.message = '';
   this.service.posteMatch(this.idCh).subscribe(res => {
     // this.loadData();
     this.message = 'the operation Added Is Successfuly';
     this.service.getMatchNotPlay(this.idCh);
   }, ex => {
     console.log(ex);
   });
}
  // tslint:disable-next-line:typedef
  Delete(){
    this.message = '';
    this.service.delete().subscribe(res => {
      // this.loadData();
      this.message = 'the operation Delete Is Successfuly';
      this.service.getMatchNotPlay(this.idCh);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  Edit(){
    this.message = '';
    this.service.EditMatch(this.idCh).subscribe(res => {
      // this.loadData();
      this.message = 'the operation Edit Is Successfuly';
      this.service.getMatchNotPlay(this.idCh);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getImageChampion(img){
    return `https://localhost:44334/wwwroot/ImageChampions/${img}`;
  }
  // tslint:disable-next-line:typedef
  getImageTeam(img){
    return `https://localhost:44334/wwwroot/ImageTeams/${img}`;
  }
}
