import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { CryptService } from '../service/crypt.service';
import { NavigateService } from '../service/navigate.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public navigate: NavigateService,
              public service: AccountService,
              protected crypt: CryptService,
              protected router: Router) { }
               role: string;
               userName: boolean;
               token: boolean;
               expire: boolean;
               isAdminExist: boolean;
  ngOnInit(): void {
  this.role = this.crypt.Decrypt(localStorage.getItem('roles')).toLowerCase();
  this.userName = !!localStorage.getItem('userName');
  this.token = !!localStorage.getItem('token');
  this.expire = !!localStorage.getItem('expire');
  console.log(this.role);
  this.adminExist();
  }
// tslint:disable-next-line:typedef
adminExist(){
if (this.role === 'admin') {
  this.isAdminExist = true;
}else{
  this.isAdminExist = false;
}
}
// tslint:disable-next-line:typedef
login(){
if (this.userName && this.token && this.expire && this.role !== '') {
  return true;
}
return false;
}
// tslint:disable-next-line:typedef
logout(){
  this.router.navigate(['/login']).then(res => {
    this.navigate.navigateDash = false;
    this.navigate.navigatePageNotFound = false;
    localStorage.removeItem('roles');
    localStorage.removeItem('expire');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    window.location.reload();
  });
}
}
