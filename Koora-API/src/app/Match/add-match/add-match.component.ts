import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';
import { NavigateService } from 'src/app/service/navigate.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  constructor(public service: MatchService,
              protected navigate: NavigateService) { }
   idChampion: number;
  ngOnInit(): void {
    this.idChampion = this.navigate.idMatchChampion;
    this.service.loadCombo(this.idChampion);
    this.service.formGroup();
  }

}
