import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(public service: UserService) { }
  messageErrorRole = 'Select Role Type';
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
      length: 'The UserName Between 12 and 25'
    },
    email: {
      required: 'The Email Is Required',
      notValid: 'The Email Is Not Valide'
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
  ngOnInit(): void {
    this.service.selectedValue = -1;
    this.service.users = {
      users: null,
      roles: null
    };
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
  select(id: number){
    this.service.selectedValue = id;
  }
  // tslint:disable-next-line:typedef
  roleMuch(){
  // tslint:disable-next-line:radix
  if (parseInt(this.service.selectedValue.toString()) === -1){
    return true;
  }
  return false;
  }
}
