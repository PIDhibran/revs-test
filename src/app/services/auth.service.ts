import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, generate } from 'rxjs';
import { LoggedUser, User } from '../models/user.model';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private logged: boolean = false;
  private emailVerified: boolean = false;
  private user: User |  null = null ;
  userExists:boolean = false;

  constructor(
    private router: Router
  ) { }

  // SignUp
  async signUp(username:string, email: string, password:string){
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          nickname: username
        },
      });
      console.log("User register successfully");
      console.log(user);
      this.user = this.saveNewUser(user);
      this.router.navigate(['auth/verification']);
    } catch (error) {
      this.userExists = true;
      console.log('Error signing in:', error);
    }
  }

  // SignIn
  async signIn(username:string, password:string) {
    // debugger

    try {
      console.log(username);
      console.log(password);
      const user = await Auth.signIn(username, password);

      this.logged = true;
      // this.user = this.saveUser(user);
      this.router.navigate(['/dashboard']);

    } catch (error) {
      console.log('error signing in', error);
    }
  }

  saveUser(response:any):User{
    const newUser: User =  {
      username: response.username,
      email: response.attributes.email
    }
    this.emailVerified = response.attributes.email_verified;

    return newUser;
  }

  saveNewUser(response:any):User{
    const newUser: User =  {
      username: response.user.username
    }
    return newUser;
  }

  async confirmVerification(code:string) {
    console.log(this.user);
    if(this.user !== null){
      try {
        await Auth.confirmSignUp(this.user.username, code);
      } catch (error) {
        console.log('error confirming sign up', error);
      }
    }
  }

  async resendValidateCode(){
    if(this.user !== null){
      try {
        await Auth.resendSignUp(this.user.username);
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }
    }
  }
  setEmailVerify(value: boolean){
    this.emailVerified = value;
  }

  isEmailVerify(){
    console.log(this.user);
    return false;
  }


  getUser(){
    return this.user;
  }

  async signOut() {
    this.user = null;
    this.router.navigate(['/auth/signin'])
  }

  setLogged(value: boolean){
    this.logged = value;
  }

  isLogged(){
    return this.logged;
  }

}
