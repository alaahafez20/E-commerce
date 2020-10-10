import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void { }

  login(){
    this._AuthService.login();
    localStorage.setItem('logged','true');
  }
  

}
