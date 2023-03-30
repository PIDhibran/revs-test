import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DoubleAuthComponent } from './double-auth/double-auth.component';
import { VerificationComponent } from './verification/verification.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    DoubleAuthComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
