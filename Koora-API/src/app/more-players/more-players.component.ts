import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../service/players.service';

@Component({
  selector: 'app-more-players',
  templateUrl: './more-players.component.html',
  styleUrls: ['./more-players.component.css']
})
export class MorePlayersComponent implements OnInit {

  constructor(public service: PlayersService,
              public router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.service.getAllPlayers(id);
  }
// tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/ImagePlayers/${img}`;
}
}
