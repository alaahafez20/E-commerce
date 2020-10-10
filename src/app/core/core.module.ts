import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { HomeGuard } from 'shared/guards/home.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:HomeComponent, canActivate:[HomeGuard]},
];

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    SharedModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
