import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { Message } from '../Models/Message';
import { MessageDto } from '../Models/message-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  fg: FormGroup;
  constructor(protected fb: FormBuilder,
              protected http: HttpClient) { }
  message: MessageDto;
  allMessages: Message[];
  url = 'https://localhost:44334/Message/';
  headers = new HttpHeaders({'Authorization' : `Bearer ${localStorage.getItem('token')}`});
  connexion = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/messageHubs').build();
  connexionVue = new signalR.HubConnectionBuilder().withUrl('https://localhost:44334/vueHubs').build();
  // tslint:disable-next-line:typedef
  receveMessage(){
this.connexion.on('receveMessage', (res) => {
  this.allMessages.unshift(res);
});
  }
  // tslint:disable-next-line:typedef
  sendMessage(){
this.connexion.invoke('sendMessage', this.message);
  }
  // tslint:disable-next-line:typedef
  getAllMessage(){
this.http.get(`${this.url}getAllMessage`, {headers: this.headers}).toPromise().then(res => {
this.allMessages = res as Message[];
}, ex => {
  console.log(ex);
});
  }
  // tslint:disable-next-line:typedef
  vue(id: number){
this.connexionVue.invoke('vue', id);
  }
  // tslint:disable-next-line:typedef
  getResultVue(){
this.connexionVue.on('result', (res) => {
  this.allMessages.forEach(message => {
    if (message.id === res.id ) {
        message.etat = res.etat;
    }
  });
});
  }
  // tslint:disable-next-line:typedef
  deleteMessage(id) {
    return this.http.delete(`${this.url}deleteMessage/${id}`, {headers: this.headers});
  }
}
