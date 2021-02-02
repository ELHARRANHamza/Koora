import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from '../Models/add-user';
import { Login } from '../Models/login';
import { UserMuch } from '../Models/user-much';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user: AddUser;
  image: string;
  url = 'https://localhost:44334/Account/';
  fg: FormGroup;
  loginCl: Login;
  userMuch: UserMuch[];
  file: File;
  formData: FormData;
  constructor(protected http: HttpClient, protected fb: FormBuilder) { }
  // tslint:disable-next-line:typedef
Register(){
  return this.http.post(`${this.url}register`, this.user);
  }
    // tslint:disable-next-line:typedef
    isUserNameMatch(){
      const userName = this.fg.get('userName').value;
      const users = this.userMuch;
      if (this.fg.get('userName').valid){
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < users.length; i++) {
         if (users[i].userName === userName){
           return true;
         }
     }
    }
      return false;
    }
    // tslint:disable-next-line:typedef
    isEmailMatch(){
      const email = this.fg.get('email').value;
      const users = this.userMuch;
      if (this.fg.get('email').value !== null && this.fg.get('email').value !== ''){
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < users.length; i++) {
         if (users[i].email === email){
           return true;
         }
     }
    }
      return false;
    }
    // tslint:disable-next-line:typedef
    bindingFormGroup(){
      this.fg = this.fb.group({
        id: 0,
        nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(25)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      });
    }
      // tslint:disable-next-line:typedef
  getUser(){
    this.http.get(`${this.url}getUsers`).toPromise().then(res => {
        this.userMuch = res as UserMuch[];
        console.log(this.userMuch);
      }, ex => {
        console.log(ex);
      });
  }
  // tslint:disable-next-line:typedef
  Login(){
return this.http.post(`${this.url}login`, this.loginCl);
  }
  // tslint:disable-next-line:typedef
  changeImage(userName){
    this.loadData();
    return this.http.patch(`${this.url}changeImage/${userName}`, this.formData);
  }
  // tslint:disable-next-line:typedef
  loadData(){
    this.formData = new FormData();
    this.formData.append('file', this.file);
  }
  // tslint:disable-next-line:typedef
  getImage(userName){
    this.http.get(`${this.url}getImage/${userName}`).toPromise().then(res => {
          this.image = res['image'];
    }, ex => {
      console.log(ex);
    });
  }
}
