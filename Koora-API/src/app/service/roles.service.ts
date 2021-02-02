import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles: Role[];
  role: Role;
  url = 'https://localhost:44334/Roles/';
  headers  = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`});
  constructor(protected http: HttpClient) { }
  // tslint:disable-next-line:typedef
  get(){
    this.http.get(`${this.url}liste`, {headers: this.headers}).toPromise().then(res => {
      this.roles = res as Role[];
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  post(){
    return this.http.post(`${this.url}add`, this.role, {headers: this.headers});
  }
  // tslint:disable-next-line:typedef
  put(id){
    return this.http.put(`${this.url}edit/${id}`, this.role, {headers: this.headers});
  }
  // tslint:disable-next-line:typedef
  Delete(id){
    return this.http.delete(`${this.url}delete/${id}`, {headers: this.headers});
  }
}
