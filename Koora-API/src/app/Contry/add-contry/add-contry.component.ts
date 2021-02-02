import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CountryService } from 'src/app/service/country.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-contry',
  templateUrl: './add-contry.component.html',
  styleUrls: ['./add-contry.component.css']
})
export class AddContryComponent implements OnInit {

  constructor(public service: CountryService) { }

  ngOnInit(): void {
    this.service.contry = {
      id: 0,
      image: '',
      name: '',
      teams: []
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
