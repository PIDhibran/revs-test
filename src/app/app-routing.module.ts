import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sigin',
    pathMatch: 'full'
  },
  {
    path: 'sigin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
