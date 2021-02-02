import { Component, OnInit } from '@angular/core';
import { MatchTvService } from 'src/app/service/match-tv.service';

@Component({
  selector: 'app-add-match-tv',
  templateUrl: './add-match-tv.component.html',
  styleUrls: ['./add-match-tv.component.css']
})
export class AddMatchTvComponent implements OnInit {

  constructor(public service: MatchTvService) { }

  ngOnInit(): void {
    this.service.matchTv = {
      id: 0,
      id_match: 0,
      id_tv: 0
    };
    this.service.loadCombo();
    this.service.formGroup();
  }

}
