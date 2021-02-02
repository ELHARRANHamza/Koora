import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import * as $ from 'jquery';
import { CryptService } from '../service/crypt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.css']
})
export class ChangeImageComponent implements OnInit {

  constructor(public service: AccountService,
              protected crypt: CryptService,
              protected route: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  uploadFile(event){
     if (event.target.files[0] !== null){
     const fileReader = new FileReader();
  //   // tslint:disable-next-line:only-arrow-functions
     this.service.file = event.target.files[0];
     fileReader.onload = function(e){
     $('#image').attr('src', e.target.result);
     };
     fileReader.readAsDataURL(this.service.file);
   }else{
     this.service.file = null;
   }
  }
  // tslint:disable-next-line:typedef
  change(){
    const userName = this.crypt.Decrypt(localStorage.getItem('userName'));
    this.service.changeImage(userName).subscribe(res => {
      this.route.navigate(['/dashBoard']).then(re => {
        window.location.reload();
      });
    }, ex => {
      console.log(ex);
    });
  }
}
