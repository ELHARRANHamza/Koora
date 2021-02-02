import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {

  constructor(public service: UserService) { }
  message: string;
  id: number;

  messageErrorRole = 'Select Role Type';
  ngOnInit(): void {
    this.service.allUsers();
    this.service.getUser();
    this.service.bindingFormGroup();
  }
  // tslint:disable-next-line:typedef
  Delete(){
    this.id = this.service.fg.get('id').value;
    this.service.delete(this.id).subscribe(res => {
     this.service.allUsers();
    }, ex => {
      console.log(ex);
    } );
  }
  // tslint:disable-next-line:typedef
  select(item){
    this.service.fg.get('id').setValue(item.id);
    this.service.fg.get('nom').setValue(item.nom);
    this.service.fg.get('prenom').setValue(item.prenom);
    this.service.fg.get('email').setValue(item.email);
    this.service.fg.get('userName').setValue(item.userName);
  }
    // tslint:disable-next-line:typedef
    isPasswordMatch() {
      const password = this.service.fg.get('password').value;
      const confirmPassword = this.service.fg.get('confirmPassword').value;
      if (password !== '' && confirmPassword !== ''){
        if (password === confirmPassword) {
         if ((confirmPassword.length > 5 && password.length > 5)) {
          return true;
         }
        }
      }
      return false;
    }
    // tslint:disable-next-line:typedef
roleMuch(){
  // tslint:disable-next-line:radix
  if (parseInt(this.service.selectedValue.toString()) === -1){
    return true;
  }
  return false;
  }
// tslint:disable-next-line:typedef
Create(){
  this.loadData();
  this.service.addUser().subscribe(res => {
    console.log(res);
  }, ex => {
   console.log(ex);
  });
}
// tslint:disable-next-line:typedef
loadData(){
  this.service.user = {
    id: 0,
    nom: this.service.fg.get('nom').value,
    prenom: this.service.fg.get('prenom').value,
    email: this.service.fg.get('email').value,
    userName: this.service.fg.get('userName').value,
    password: this.service.fg.get('password').value,
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:radix
    id_Roles: parseInt(this.service.selectedValue.toString())
  };
  }

}
