import { Component } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private _UserService:UserService, _Router:Router, private _AuthService: AuthService) {
    this._AuthService.user.subscribe( user => {
      if(user)
      this._UserService.save(user)
    })
    if(localStorage.getItem('logged') == 'true'){
      _Router.navigate(['/shop/products'])
      localStorage.removeItem('logged')
    }
  }
}
