import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  constructor(public service: AccountService) { }
  messageValidate = {
    prenom: {
      required: 'The FirstName Is Required',
      length: 'The FirstName Between 3 and 25'
    },
    nom: {
      required: 'The LastName Is Required',
      length: 'The LastName Between 3 and 25'
    },
    userName: {
      required: 'The UserName Is Required',
      matchUserName: 'The UserName Is Existe',
      length: 'The UserName Between 12 and 25'
    },
    email: {
      required: 'The Email Is Required',
      notValid: 'The Email Is Not Valide',
      matchEmail: 'The Email Is Existe'
    },
    pass: {
      required: 'The Password Is Required',
      minLength: 'The Minimum Length is 6'
    },
    passConfirm: {
      required: 'The Cofirm Password Is Required',
      isMatch: 'The Confirm Password Is Defferentiate Password'
    },
  };
  message: string;
  ngOnInit(): void {
    this.service.getUser();
    this.message = '';
    this.service.bindingFormGroup();
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
    Create(){
      this.loadData();
      this.service.Register().subscribe(res => {
        this.message = 'The Operation Create Account Succefully';
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
    id_Roles: 0
  };
  }
}
