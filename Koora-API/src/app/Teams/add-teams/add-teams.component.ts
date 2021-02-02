import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/service/teams.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.css']
})
export class AddTeamsComponent implements OnInit {

  constructor(public service: TeamsService) { }

  ngOnInit(): void {
    this.service.loadCmb = {
      categories: null,
      contries: null
    };
    this.service.loadCombo();
    this.service.formGroup();
  }
  // tslint:disable-next-line:typedef
  uploadFile(event){
    if (event.target.files[0] !== null){
    const fileReader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    this.service.teams.file = event.target.files[0];
    fileReader.onload = function(e){
    $('#image').attr('src', e.target.result);
    };
    fileReader.readAsDataURL(this.service.teams.file);
  }else{
    this.service.teams.file = null;
  }
  }
}
