import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DoubleAuthComponent } from './double-auth/double-auth.component';
import { VerificationComponent } from './verification/verification.component';
import { VerificationGuard } from '../guards/verification.guard';
import { AuthGuard } from '../guards/auth.guard';
import { DoubleAuthGuard } from '../guards/double-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'double',
    component: DoubleAuthComponent,
    canActivate: [DoubleAuthGuard]
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
