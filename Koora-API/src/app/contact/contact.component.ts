import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { NavigateService } from '../service/navigate.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public service: ContactService,
              public navigate: NavigateService,
              public fb: FormBuilder) { }
fg: FormGroup;
  ngOnInit(): void {
    this.service.message = {
      id: 0,
      message: '',
      adresse: '',
      email: '',
      name: ''
    };
    // this.service.formGroup();
    this.fg = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(14),
        Validators.maxLength(50)]],
      name: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)]],
      address: '',
      message: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.service.receveMessage();
    this.service.connexion.start();
    this.navigate.navigateDash = false;
    this.navigate.navigatePageNotFound = false;
  }
    // tslint:disable-next-line:typedef
    loadData(){
      this.service.message.message = this.fg.get('message').value;
      this.service.message.email = this.fg.get('email').value;
      this.service.message.name = this.fg.get('name').value;
      this.service.message.adresse = this.fg.get('address').value;
      }
// tslint:disable-next-line:typedef
sendMessage(){
this.loadData();
this.service.sendMessage();
}
}
