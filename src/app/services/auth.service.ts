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
  userExists = false;


  constructor(
    private router: Router
  ) { }

  // SignUp
  async signUp(username:string, email: string, password:string ){
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
  signIn(email:string, password:string): Observable<string> {
    return new Observable(observer => {
      Auth.signIn(email, password).then(
        (response) => {
          this.logged = true;
          console.log(response);
          this.user = this.saveUser(response);

          observer.next('success');
          observer.complete();
        },
        (error) => {
          this.logged = false;
          observer.error(error);
        }
      );
    });
  }

  saveUser(response:any):User{
    // console.log("username", response.username);
    // console.log("email", response.attributes.email);
    const newUser: User =  {
      username: response.username,
      email: response.attributes.email
    }

    this.emailVerified = response.attributes.email_verified;

    return newUser;
    // console.log("verify:", response.attributes.email_verified);
  }

  saveNewUser(user:any):User{
    const newUser: User =  {
      username: user.user.username
    }

    return newUser;
  }

  // validateUser(username:string, code:string): Observable<string> {
  //   return new Observable( observer => {
  //     Auth.confirmSignUp(username, code).then(
  //       (response) => {
  //         console.log(response);
  //         observer.next('success');
  //         observer.complete();
  //       },
  //       (error) => {
  //         observer.error(error);
  //       }
  //     )
  //   });
  // }

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



  verifyTokenDoubleAuth(token: string){
    if(token === '123'){

      return true;
    }
    return false;
  }

  getUser(){
    return this.user;
  }

  async signOut() {
    // this.logged.next(false);
    // localStorage.removeItem('isLoggedIn');
    // try {
    //   Auth.signOut(user, password)
    // } catch (error) {

    // }

    this.router.navigate(['/auth/signin'])
  }

  setLogged(value: boolean){
    this.logged = value;
  }

  isLogged(){
    return this.logged;
  }

}
