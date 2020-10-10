import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { CartService } from 'shared/services/cart.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  isAdmin: boolean;

  userUid: string;
  cartItemsNum: number;
  isNavbarCollapsed = true;

  constructor(private _AuthService: AuthService, _AngularFireAuth:AngularFireAuth, _CartService:CartService) {
    _AuthService.user.subscribe( FirebaseUser => {
      this.user = FirebaseUser;
    })
    _AuthService.userfromDatabase().subscribe( userFromDatabase => {
      this.isAdmin = userFromDatabase.isAdmin
    })
    _AngularFireAuth.authState.subscribe(user => {
      this.userUid = user.uid
      _CartService.getCart(this.userUid).subscribe(carts => {
        this.cartItemsNum = carts.length
      })})
  }

  logout() {
    this._AuthService.logout()
  }
  
  ngOnInit(): void {}


}
