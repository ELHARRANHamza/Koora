import { Component, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/service/champion.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-champions',
  templateUrl: './add-champions.component.html',
  styleUrls: ['./add-champions.component.css']
})
export class AddChampionsComponent implements OnInit {
  constructor(public service: ChampionService) { }

  ngOnInit(): void {
    this.service.champion = {
      id: 0,
      name: '',
      image: '',
      matches: null
    };
    this.service.formGroup();
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
}


