import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/service/players.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent implements OnInit {

  constructor(public service: PlayersService) { }

  ngOnInit(): void {
    this.service.formGroup();
    console.log(this.service.teams);
  }
  // tslint:disable-next-line:typedef
  uploadFile(event){
    if (event.target.files[0] !== null){
    const fileReader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    this.service.player.file = event.target.files[0];
    fileReader.onload = function(e){
    $('#image').attr('src', e.target.result);
    };
    fileReader.readAsDataURL(this.service.player.file);
  }else{
    this.service.player.file = null;
  }
  }
}
