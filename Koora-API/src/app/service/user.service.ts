import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AddUser } from '../Models/add-user';
import { Role } from '../Models/role';
import { User } from '../Models/user';
import { UserDto } from '../Models/user-dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient,
              public fb: FormBuilder) { }
  users: UserDto;
  user: AddUser;
  listUserEmail: User[];
  listUserName: User[];
  fg: FormGroup;
  Allusers: User[];
  // tslint:disable-next-line:ban-types
  selectedValue: Number;
  url = 'https://localhost:44334/User/';
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  // tslint:disable-next-line:typedef
  getUser(){
    this.http.get(`${this.url}userDto`, {headers: this.headers}).toPromise().then(u => {
      this.users = u as UserDto;
    }, ex => {
      console.log(ex);
    });
  }
// tslint:disable-next-line:typedef
addUser(){
return this.http.post(`${this.url}AddUser`, this.user, {headers: this.headers});
}
// tslint:disable-next-line:typedef
allUsers(){
this.http.get(`${this.url}allUsers`, {headers: this.headers}).toPromise().then(res => {
this.Allusers = res as User[];
}, ex => {
  console.log(ex);
});
}
// tslint:disable-next-line:typedef
Edit(id: number){
  return this.http.put(`${this.url}editUser/${id}`, this.user, {headers: this.headers});
}
  // tslint:disable-next-line:typedef
  isUserNameMatch(){
    const userName = this.fg.get('userName').value;
    this.listUserName = [];
    this.listUserName = this.users.users;
    if (this.fg.get('userName').valid){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listUserName.length; i++) {
       if (this.listUserName[i].userName === userName){
         return true;
       }
   }
  }
    return false;
  }
  // tslint:disable-next-line:typedef
  isEmailMatch(){
    const email = this.fg.get('email').value;
    this.listUserEmail = [];
    this.listUserEmail = this.users.users;
    if (this.fg.get('email').value !== null && this.fg.get('email').value !== ''){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listUserEmail.length; i++) {
       if (this.listUserEmail[i].email === email){
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
  delete(id: number){
  return this.http.delete(`${this.url}deleteUser/${id}`, {headers: this.headers});
  }
}
