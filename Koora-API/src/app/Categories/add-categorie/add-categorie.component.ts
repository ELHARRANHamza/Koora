import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  constructor(public service: CategorieService) { }

  ngOnInit(): void {
    this.service.categorie = {
      id: 0,
      cat_Nom: ''
    };
  }
}
