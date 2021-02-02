import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-tv',
  templateUrl: './add-tv.component.html',
  styleUrls: ['./add-tv.component.css']
})
export class AddTvComponent implements OnInit {
  constructor(public service: TvService) { }

  ngOnInit(): void {
    this.service.tv = {
      id: 0,
      nom: '',
      logo: ''
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

