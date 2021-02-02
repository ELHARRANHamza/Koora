import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/News.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  constructor(public service: NewsService) { }
  message: string;
  id: number;
  ngOnInit(): void {
    this.message = '';
    this.id = 0;
    this.service.getNews();
    this.service.getNewsHubs();
    if (this.service.connexion.state === 'Disconnected'){
    this.service.connexion.start();
    }
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.fg.get('Titre').setValue(item.titre);
    this.service.fg.get('Description').setValue(item.description);
    this.service.news.id_Cat = item.getCategories.id;
    this.service.news.image = this.getImage(item.image);
    this.service.fg.get('id').setValue(item.id);
    this.id = item.id;
    this.service.selectedValues = item.getCategories.id;
  }

// tslint:disable-next-line:typedef
Delete(){
  const id = this.service.fg.get('id').value;
  this.service.deleteNews(id).subscribe(res => {
   this.message = 'The Operation Delete Is Successfuly';
   this.service.invokeNewsHubs();
  }, ex => {
    console.log(ex);
  });
}
// tslint:disable-next-line:typedef
getImage(img){
return `https://localhost:44334/wwwroot/News/${img}`;
}
// tslint:disable-next-line:typedef
add(){
  this.loadData();
  this.service.postNews().subscribe(res => {
    this.service.invokeNewsHubs();
}, ex => {
  console.log(ex);
});

}
// tslint:disable-next-line:adjacent-overload-signatures
// tslint:disable-next-line:typedef
loadData(){
  this.service.news.titre = this.service.fg.get('Titre').value;
  this.service.news.description =  this.service.fg.get('Description').value;
  this.service.news.id_Cat = this.service.selectedValues;
}
// tslint:disable-next-line:typedef
loadData1(){
    this.service.fg.get('Titre').setValue('');
    this.service.fg.get('Description').setValue('');
    this.service.news.image = '';
    this.service.fg.get('id').setValue(0);
    this.id = 0;
}
// tslint:disable-next-line:typedef
edit(){
  this.loadData();
  const id = this.service.fg.get('id').value;
  this.service.editNews(id).subscribe(res => {
    this.service.invokeNewsHubs();
}, ex => {
  console.log(ex);
});
}
}
