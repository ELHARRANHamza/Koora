import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { CryptService } from '../service/crypt.service';
import { NavigateService } from '../service/navigate.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {

  constructor(protected crypt: CryptService,
              public service: AccountService,
              public navigate: NavigateService,
              protected route: Router) { }
              userName: string;
              role: string;
              roleMuch: boolean;
              expire: boolean;
              token: boolean;
              userNameMuch: boolean;
  ngOnInit(): void {
    this.userName = this.crypt.Decrypt(localStorage.getItem('userName'));
    this.service.getImage(this.userName);
    this.navigate.isCategory = false;
    this.navigate.isNews = false;
    this.navigate.isUser = false;
    this.navigate.isRole = false;
    this.navigate.isDashBoard = true;
    this.navigate.isRole = false;
    this.navigate.isChangeImage = false;
    this.navigate.navigateDash = true;
    this.navigate.isCountry = false;
    this.navigate.isTeams = false;
    this.navigate.isPlayers = false;
    this.navigate.isTv = false;
    this.navigate.isChampions = false;
    this.navigate.isMatch = false;
    this.navigate.isTeamChampion = false;
    this.navigate.navigatePageNotFound = false;
    this.navigate.isMessage = false;
    this.role = this.crypt.Decrypt(localStorage.getItem('roles')).toLowerCase();
    this.roleMuch = !!localStorage.getItem('roles');
    this.userNameMuch = !!localStorage.getItem('userName');
    this.expire = !!localStorage.getItem('expire');
    this.token = !!localStorage.getItem('token');
    if (!this.roleMuch || !this.userNameMuch || !this.expire || !this.token){
      this.navigate.navigateDash = false;
      this.navigate.navigatePageNotFound = true;
      this.route.navigate(['notFound']);
    }
  }
  // tslint:disable-next-line:typedef
  srcImage(){
    if (this.service.image === null || this.service.image === ''){
      return '../assets/images/default-user-icon.jpg';
    }else{
      return `https://localhost:44334/wwwroot/ImageUser/${this.service.image}`;
    }
  }
  // tslint:disable-next-line:typedef
logout(){
  this.route.navigate(['/login']).then(res => {
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
