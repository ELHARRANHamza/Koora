import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-list-contry',
  templateUrl: './list-contry.component.html',
  styleUrls: ['./list-contry.component.css']
})
export class ListContryComponent implements OnInit {

  constructor(public service: CountryService,
              public navigate: NavigateService) { }
message: string;
  ngOnInit(): void {
    this.message = '';
    this.service.contry = {
      id: 0,
      image: '',
      name: '',
      teams: []
    };
    this.service.file = null;
    this.service.getCountry();
  }
// tslint:disable-next-line:typedef
loadData(){
  this.message = '';
  this.service.file = null;
  this.service.contry = {
    id: 0,
    name: '',
    image: '',
    teams: []
  };
  this.service.fg.get('name').setValue('');
}
 // tslint:disable-next-line:typedef
 Add(){
  this.message = '';
  this.service.postCountry().subscribe(res => {
    this.loadData();
    this.message = 'the operation Added Is Successfuly';
    this.service.getCountry();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
Edit(){
  const id = this.service.contry.id;
  this.service.edit(id).subscribe(res => {
    this.message = 'the operation Edit Is Successfuly';
    this.service.file = null;
    this.service.getCountry();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
select(item){
  this.service.contry.id = item.id;
  this.service.fg.get('name').setValue(item.name);
  this.service.contry.image = this.getImage(item.image);
  this.message = '';
}
// tslint:disable-next-line:typedef
Delete(){
  const id = this.service.contry.id;
  this.service.delete(id).subscribe(res => {
    this.service.getCountry();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/ImageCountry/${img}`;
  }

}
