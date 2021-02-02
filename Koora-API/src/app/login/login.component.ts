import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parse } from 'path';
import { AccountService } from '../service/account.service';
import { CryptService } from '../service/crypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: AccountService,
              protected fb: FormBuilder,
              protected crypt: CryptService,
              protected route: Router) { }
  messageValidate = {
    userName: {
      required: 'The UserName Is Required'
    },
    pass: {
      required: 'The Password Is Required'
    },
  };
  fg: FormGroup;
  ngOnInit(): void {
    this.service.loginCl = {
      userName: '',
      password: '',
      remember: false
    };
    this.fg = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }
  // tslint:disable-next-line:typedef
  login(){
this.loadData();
this.service.Login().subscribe((res) => {
  const userName = this.crypt.Encrypt(this.service.loginCl.userName);
  const roles = this.crypt.Encrypt(res['role']);
  // const remember = this.crypt.Encrypt((this.service.loginCl.remember.toString()));
  localStorage.setItem('userName', userName);
  // localStorage.setItem('remember', remember);
  localStorage.setItem('token', res['token']);
  localStorage.setItem('roles', roles);
  localStorage.setItem('expire', this.crypt.Encrypt(res['expire']));
  this.route.navigate(['home']).then(x => {window.location.reload(); });
}, ex => {
  console.log(ex);
});
  }
  // tslint:disable-next-line:typedef
  loadData(){
this.service.loginCl = {
  userName: this.fg.get('userName').value,
  password: this.fg.get('password').value,
  remember: this.fg.get('rememberMe').value
};
  }

}
