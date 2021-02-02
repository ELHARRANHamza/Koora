import { Message } from '../Models/Message';
import { Component, OnInit } from '@angular/core';
import { CommentaireDto } from '../Models/commentaire-dto';
import { ContactService } from '../service/contact.service';
import { DashBoardService } from '../service/dash-board.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(public service: DashBoardService,
              public serviceMessage: ContactService) { }
cmt: CommentaireDto;
test: boolean;
message: Message;
  ngOnInit(): void {
    this.serviceMessage.allMessages = [];
    this.message = {
      id: 0,
      adresse: '',
      name: '',
      email: '',
      etat: 0,
      date_Poste: null,
      message: ''
    };
    this.test = false;
    this.service.getDashBoard();
    this.serviceMessage.getAllMessage();
    this.serviceMessage.getResultVue();
    if (this.serviceMessage.connexionVue.state === 'Disconnected'){
    this.serviceMessage.connexionVue.start();
    }
    this.serviceMessage.receveMessage();
    if (this.serviceMessage.connexion.state === 'Disconnected'){
    this.serviceMessage.connexion.start();
    }
  }
// tslint:disable-next-line:typedef
getImageNews(img){
  return `https://localhost:44334/wwwroot/News/${img}`;
}
// tslint:disable-next-line:typedef
getImageUser(img){
  return `https://localhost:44334/wwwroot/ImageUser/${img}`;
}
// tslint:disable-next-line:typedef
selectNews(id){
this.service.selectNews(id);
const length = this.service.list_Cmt.length;
if (length <= 0) {
  this.test = false;
 }else{
   this.test = true;
 }
}
// tslint:disable-next-line:typedef
select(item){
this.message.id = item.id;
this.message.name = item.name;
this.message.date_Poste = item.date_Poste;
this.message.message = item.message;
this.serviceMessage.vue(this.message.id);
}
}
