import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;
import * as $ from 'jquery';
import { CategorieService } from 'src/app/service/categorie.service';
import { NewsService } from 'src/app/service/News.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  constructor(public service: NewsService,
              public serviceCat: CategorieService) { }

messageValidation = {
   Titre: {
    required: 'The Titre Is Required',
    Lenght: 'The Minimum Length Is 5 And The Maximum Length Is 250'
  },
  Description: {
    required: 'The Description Is Required',
    Lenght: 'The Minimum Length Is 10'
  },
  Categorie: {
    much: 'Select To Category'
  }
  };
  ngOnInit(): void {
    this.service.file = null;
    this.serviceCat.get();
    // tslint:disable-next-line:no-unused-expression
    this.service.selectedValues = -1;
    this.service.fg = this.service.fb.group({
      id: 0,
      Titre: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      file: ['', [Validators.required]]
    });
    this.service.news = {
      titre: '',
      description: '',
      id: 0,
      id_Cat: 0,
      image: ''
    };
    // tslint:disable-next-line:only-arrow-function
    this.service.getNewsHubs();
  }
  // tslint:disable-next-line:typedef
  uploadFile(event){
    if (event.target.files[0] !== null){
    const fileReader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    this.service.file = event.target.files[0];
    fileReader.onload = function(e){
    $('#image').attr('src', e.target.result);
    };
    fileReader.readAsDataURL(this.service.file);
  }else{
    this.service.file = null;
  }
  }
// tslint:disable-next-line:typedef
selectValue(id: number){
  this.service.selectedValues = id;
}
}
