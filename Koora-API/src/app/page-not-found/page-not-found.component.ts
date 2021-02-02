import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../service/navigate.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(protected navigate: NavigateService) { }

  ngOnInit(): void {
    this.navigate.navigatePageNotFound = true;
    this.navigate.navigateDash = false;
    alert('Good');
  }

}
