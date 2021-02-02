import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/service/categorie.service';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(public service: CategorieService) { }
title: string;
message: string;
  ngOnInit(): void {
    this.loadData();
    this.service.get();
  }
 // tslint:disable-next-line:typedef
 Add(){
  this.message = '';
  this.service.post().subscribe(res => {
    this.message = 'the operation Added Is Successfuly';
    this.loadData();
    this.service.get();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
select(item){
this.message = '';
this.service.categorie = {
  id: item.id,
  cat_Nom: item.cat_Nom
};
}
// tslint:disable-next-line:typedef
Edit(){
  this.message = '';
  this.service.put(this.service.categorie.id).subscribe(res => {
    this.message = 'The Operation Edit Is Successfuly';
    this.service.get();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
loadData(){
  this.message = '';
  this.service.categorie = {
    id: 0,
    cat_Nom: ''
  };
}
// tslint:disable-next-line:typedef
Delete(){
  this.message = '';
  this.service.Delete(this.service.categorie.id).subscribe(res => {
    this.message = 'The Operation Delete Is Successfuly';
    this.service.get();
  }, ex => {
    console.log(ex);
  });
}
}
