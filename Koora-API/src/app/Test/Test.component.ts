import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-Test',
  templateUrl: './Test.component.html',
  styleUrls: ['./Test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }
  nom: string;
  message: string;
connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/news_Hubs').build();
  // tslint:disable-next-line:typedef
  ngOnInit() {
this.nom = '';
this.message = '';
this.connexion.on('getMessage', (nom, message) => {
console.log(`${nom}`);
});
this.connexion.start();
  }
// tslint:disable-next-line:typedef
posteMessage(){
  this.connexion.invoke('posteMessage', this.nom, this.message);
}
}
