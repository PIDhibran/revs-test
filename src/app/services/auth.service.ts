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
  private user: User | LoggedUser | null = null ;


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
      console.log("enviado");
      console.log(user);
    } catch (error) {
      console.log('Error signing in:', error);
    }
  }

  // SignIn
  signIn(email:string, password:string): Observable<string> {
    return new Observable(observer => {
      Auth.signIn(email, password).then(
        (response) => {
          this.logged = true;
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

  validateUser(username:string, code:string): Observable<string> {
    return new Observable( observer => {
      Auth.confirmSignUp(username, code).then(
        (response) => {
          console.log(response);
          observer.next('success');
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      )
    });
    // try {
    //   await Auth.confirmSignUp(username, code);
    // } catch (error) {
    //   console.log('error confirming sign up', error);
    // }
  }

  async resendValidateCode(){
    if(this.user !== null){
      try {
        await Auth.resendSignUp("pavel");
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
