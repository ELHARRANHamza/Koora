import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatchTV } from '../Models/match-tv';
import { MatchTVDto } from '../Models/match-tvdto';
import { Tv } from '../Models/tv';

@Injectable({
  providedIn: 'root'
})
export class MatchTvService {
  url = 'https://localhost:44334/MatchTv/';
  matchesTv: MatchTV[];
  matchTv: MatchTVDto;
  fg: FormGroup;
  tvs: Tv[];
  constructor(protected http: HttpClient,
              protected fb: FormBuilder) { }

              // tslint:disable-next-line:typedef
              loadCombo(){
                this.http.get(`${this.url}loadComboMatchTv`).toPromise().then(res => {
                  this.tvs = res as Tv[];
                }, ex => {
                  console.log(ex);
                });
              }
  // tslint:disable-next-line:typedef
  getMatchTv(id){
    this.http.get(`${this.url}getMatchTv/${id}`).toPromise().then(res => {
          this.matchesTv = res as MatchTV[];
        }, ex => {
          console.log(ex);
        });
       }
       // tslint:disable-next-line:typedef
       formGroup(){
this.fg = this.fb.group({
id: 0,
id_tv: 0
});
       }
         // tslint:disable-next-line:typedef
  loadData(idMatch: number){
this.matchTv.id_match = idMatch;
// tslint:disable-next-line:radix
this.matchTv.id_tv = parseInt(this.fg.get('id_tv').value);
  }
  // tslint:disable-next-line:typedef
  postMatchTv(idMatch){
    this.loadData(idMatch);
    return this.http.post(`${this.url}postMatchTv`, this.matchTv);
  }
  // tslint:disable-next-line:typedef
  editMatchTv(idMatch){
    this.loadData(idMatch);
    return this.http.put(`${this.url}putMatchTv/${this.matchTv.id}`, this.matchTv);
  }
  // tslint:disable-next-line:typedef
  deleteMatchTv(){
    return this.http.delete(`${this.url}deleteMatchTv/${this.matchTv.id}`);
  }
}
