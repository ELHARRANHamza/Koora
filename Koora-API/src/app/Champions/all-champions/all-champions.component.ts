import { Component, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/service/champion.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-all-champions',
  templateUrl: './all-champions.component.html',
  styleUrls: ['./all-champions.component.css']
})
export class AllChampionsComponent implements OnInit {
  constructor(public service: ChampionService,
              public navigate: NavigateService) { }
  message: string;
    ngOnInit(): void {
      this.message = '';
      this.service.champion = {
        id: 0,
        image: '',
        name: '',
        matches: null
      };
      this.service.file = null;
      this.service.getChampion();
    }
  // tslint:disable-next-line:typedef
  loadData(){
    this.message = '';
    this.service.file = null;
    this.service.champion = {
      id: 0,
      image: '',
      name: '',
      matches: null
    };
    this.service.fg.get('nom').setValue('');
  }
   // tslint:disable-next-line:typedef
   Add(){
    this.message = '';
    this.service.postChampion().subscribe(res => {
      this.loadData();
      this.message = 'the operation Added Is Successfuly';
      this.service.getChampion();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  Edit(){
    const id = this.service.champion.id;
    this.service.edit(id).subscribe(res => {
      this.message = 'the operation Edit Is Successfuly';
      this.service.file = null;
      this.service.getChampion();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.champion.id = item.id;
    this.service.fg.get('nom').setValue(item.name);
    this.service.champion.image = this.getImage(item.image);
    this.message = '';
  }
  // tslint:disable-next-line:typedef
  Delete(){
    const id = this.service.champion.id;
    this.service.delete(id).subscribe(res => {
      this.service.getChampion();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getImage(img){
    return `https://localhost:44334/wwwroot/ImageChampions/${img}`;
    }
  }
