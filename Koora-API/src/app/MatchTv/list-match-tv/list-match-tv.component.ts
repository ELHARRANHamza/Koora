import { Component, OnInit } from '@angular/core';
import { MatchTvService } from 'src/app/service/match-tv.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-list-match-tv',
  templateUrl: './list-match-tv.component.html',
  styleUrls: ['./list-match-tv.component.css']
})
export class ListMatchTvComponent implements OnInit {

  constructor(public service: MatchTvService,
              public navigate: NavigateService) { }
  message: string;
  idMatch: number;
  ngOnInit(): void {
    this.message = '';
    this.service.matchTv = {
    id: 0,
    id_tv: 0,
    id_match: 0
  };
    this.idMatch =  this.navigate.idMatch;
    this.service.getMatchTv(this.idMatch);
  }
  // tslint:disable-next-line:typedef
  loadData(){
    this.message = '';
    this.service.matchTv = {
      id: 0,
      id_match: 0,
      id_tv: 0
    };
    this.service.fg.get('id_tv').setValue(0);
  }
   // tslint:disable-next-line:typedef
   Add(){
    this.message = '';
    this.service.postMatchTv(this.idMatch).subscribe(res => {
      this.loadData();
      this.message = 'the operation Added Is Successfuly';
      this.service.getMatchTv(this.idMatch);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  Edit(){
    this.service.editMatchTv(this.idMatch).subscribe(res => {
      this.message = 'the operation Edit Is Successfuly';
      this.service.getMatchTv(this.idMatch);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.matchTv.id = item.id;
    this.service.matchTv.id_tv = item.tv.id;
    this.service.fg.get('id_tv').setValue(item.tv.id);
    this.message = '';
  }
  // tslint:disable-next-line:typedef
  Delete(){
    this.service.deleteMatchTv().subscribe(res => {
      this.service.getMatchTv(this.idMatch);
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getImage(img){
    return `https://localhost:44334/wwwroot/ImageTv/${img}`;
    }
  }
