import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {

  constructor(public service: RolesService) { }

  ngOnInit(): void {
    this.service.role = {
      id: 0,
      roleName: '',
      users: null
    };
  }
}
