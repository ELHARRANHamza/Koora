import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/Message';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-all-message',
  templateUrl: './all-message.component.html',
  styleUrls: ['./all-message.component.css']
})
export class AllMessageComponent implements OnInit {

  constructor(public serviceMessage: ContactService) { }
message: Message;
  ngOnInit(): void {
    this.message = {
      id: 0,
      adresse: '',
      name: '',
      email: '',
      etat: 0,
      date_Poste: null,
      message: ''
    };
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
select(item){
  this.message.id = item.id;
  this.message.name = item.name;
  this.message.date_Poste = item.date_Poste;
  this.message.message = item.message;
  if (item.etat === 0) {
  this.serviceMessage.vue(this.message.id);
  }
  }
  // tslint:disable-next-line:typedef
  remove(id) {
this.serviceMessage.deleteMessage(id).subscribe(res => {
  this.serviceMessage.getAllMessage();
}, ex => {
  console.log(ex);
});
  }
}
