import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-list-tv',
  templateUrl: './list-tv.component.html',
  styleUrls: ['./list-tv.component.css']
})
export class ListTvComponent implements OnInit {
  constructor(public service: TvService) { }
  message: string;
    ngOnInit(): void {
      this.message = '';
      this.service.tv = {
        id: 0,
        logo: '',
        nom: ''
      };
      this.service.file = null;
      this.service.getTv();
    }
  // tslint:disable-next-line:typedef
  loadData(){
    this.message = '';
    this.service.file = null;
    this.service.tv = {
      id: 0,
      logo: '',
      nom: ''
    };
    this.service.fg.get('nom').setValue('');
  }
   // tslint:disable-next-line:typedef
   Add(){
    this.message = '';
    this.service.postTv().subscribe(res => {
      this.loadData();
      this.message = 'the operation Added Is Successfuly';
      this.service.getTv();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  Edit(){
    const id = this.service.tv.id;
    this.service.edit(id).subscribe(res => {
      this.message = 'the operation Edit Is Successfuly';
      this.service.file = null;
      this.service.getTv();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.tv.id = item.id;
    this.service.fg.get('nom').setValue(item.nom);
    this.service.tv.logo = this.getImage(item.logo);
    this.message = '';
  }
  // tslint:disable-next-line:typedef
  Delete(){
    const id = this.service.tv.id;
    this.service.delete(id).subscribe(res => {
      this.service.getTv();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  getImage(img){
    return `https://localhost:44334/wwwroot/ImageTv/${img}`;
    }
  }
