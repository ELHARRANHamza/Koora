import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-liste-roles',
  templateUrl: './liste-roles.component.html',
  styleUrls: ['./liste-roles.component.css']
})
export class ListeRolesComponent implements OnInit {

  constructor(public service: RolesService) { }
  title: string;
  message: string;
    ngOnInit(): void {
      this.loadData();
      this.service.get();
    }
   // tslint:disable-next-line:typedef
   Add(){
    this.message = '';
    this.service.post().subscribe(res => {
      this.message = 'the operation Added Is Successfuly';
      this.loadData();
      this.service.get();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  select(item){
  this.message = '';
  this.service.role = {
    id: item.id,
    roleName: item.roleName,
    users: null
  };
  }
  // tslint:disable-next-line:typedef
  Edit(){
    this.message = '';
    this.service.put(this.service.role.id).subscribe(res => {
      this.message = 'The Operation Edit Is Successfuly';
      this.service.get();
    }, ex => {
      console.log(ex);
    });
  }
  // tslint:disable-next-line:typedef
  loadData(){
    this.message = '';
    this.service.role = {
      id: 0,
      roleName: '',
      users: null
    };
  }
  // tslint:disable-next-line:typedef
  Delete(){
    this.message = '';
    this.service.Delete(this.service.role.id).subscribe(res => {
      this.message = 'The Operation Delete Is Successfuly';
      this.service.get();
    }, ex => {
      console.log(ex);
    });
  }
  }
