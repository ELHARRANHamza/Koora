import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../service/home.service';
import * as $ from 'jquery';
import { CommentaireService } from '../service/commentaire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptService } from '../service/crypt.service';
import { templateJitUrl } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit {

  constructor(public service: HomeService,
              public router: ActivatedRoute,
              public hub: CommentaireService,
              public fb: FormBuilder,
              protected cypt: CryptService,
              protected navigate: Router
              ) { }

  id: number;
  fg: FormGroup;
  ngOnInit(): void {
    const roles = !!localStorage.getItem('roles');
    const token = !!localStorage.getItem('token');
    const userName = !!localStorage.getItem('userName');
    if (!roles || !token || !userName){
      this.navigate.navigate(['/login']);
    }
    this.fg = this.fb.group({
      commentaire: ['', Validators.required]
    });
    this.id = this.router.snapshot.params['id'];
    this.service.findNews = {
      id: 0,
      titre: '',
      description: '',
      image: '',
      id_Cat: 0
    };
    this.hub.reponse = {
      idCommentaire: 0,
      userName: '',
      reponce: ''
    };
    this.service.details(this.id);
    this.hub.getCommentaires(this.id);
    this.hub.getCommentairesHub(this.id);
    if (this.hub.connexion.state === 'Disconnected'){
    this.hub.connexion.start();
    }
    this.hub.getReponseCommentaire();
    if (this.hub.connexionReponse.state === 'Disconnected'){
    this.hub.connexionReponse.start();
    }
  }
  // tslint:disable-next-line:typedef
getImage(img){
  return `https://localhost:44334/wwwroot/News/${img}`;
  }
  // tslint:disable-next-line:typedef
  postCommentaire(){
    const commentaire = this.fg.get('commentaire').value;
    const userName = this.cypt.Decrypt(localStorage.getItem('userName'));
    // tslint:disable-next-line:radix
    this.hub.postCommentaire(commentaire, parseInt(this.id.toString()), userName);
  }
  // tslint:disable-next-line:typedef
  Reponse(idCmt: number){
    const reponse = this.fg.get('commentaire').value;
    const userName = this.cypt.Decrypt(localStorage.getItem('userName')); 
    this.hub.reponse.idCommentaire = idCmt;
    this.hub.reponse.userName = userName;
    this.hub.reponse.reponce = reponse;
    this.hub.Reponse();
  }
  // tslint:disable-next-line:typedef
  getImageUser(img){
    return `https://localhost:44334/wwwroot/ImageUser/${img}`;
  }

}
