import { getLocaleDateTimeFormat } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { CryptService } from './service/crypt.service';
import { NavigateService } from './service/navigate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public navigate: NavigateService,
              public router: Router,
              protected crypt: CryptService,
              protected route: Router) { }
              test: boolean;
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    const date = new Date();
    const expire = new Date(this.crypt.Decrypt(localStorage.getItem('expire')));
    setInterval(() => {
      if (date >= expire) {
        this.route.navigate(['/home']).then(res => {
          localStorage.removeItem('roles');
          localStorage.removeItem('expire');
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          this.navigate.navigateDash = false;
          this.navigate.navigatePageNotFound = false;
          window.location.reload();
        });
        }
        }, 10000);
    this.navigate.navigateDash = false;
    this.navigate.navigatePageNotFound = false;
  }

}
