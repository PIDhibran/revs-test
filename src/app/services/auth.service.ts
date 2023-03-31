import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, generate } from 'rxjs';
import { User } from '../models/user.model';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private logged: boolean = false;
  private emailVerified: boolean = false;
  private user: User = { token: "", email: ""};
  private userExists: boolean = false;

  constructor(
    private router: Router
  ) { }

  // SignUp
  signUp(username:string, email: string, password:string):Observable<string>{
    return new Observable(observer => {
      Auth.signUp({
        username,
        password,
        attributes: {
          email,
          nickname: username
        },
      }).then(
        (response) => {
          this.user = this.saveUser("", email)
          this.logged = true;
          this.router.navigate(['auth/verification'])

          observer.next('success');
          observer.complete();
        },
        (error) => {
          this.logged = false;
          this.userExists = true;
          observer.error(error);
        }
      );
    });
  }

  // SignIn
  signIn(username:string, password:string):Observable<string> {
    return new Observable(observer => {
      Auth.signIn(username, password).then(
        (response) => {
          this.logged = true;
          this.user = this.saveUser("", username);

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

  confirmVerification(code:string):Observable<string> {
    console.log(this.user);
    return new Observable(observer => {
      Auth.confirmSignUp("pavelmontes22@gmail.com", code).then(
        (response) => {
          observer.next("Email confirmed");
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }

      )
    });
  }

  resendValidateCode(): Observable<string>{
    const email = "pavelmontes22@gmail.com";
    return new Observable(observer => {
      Auth.resendSignUp(email).then(
        (response) => {
          observer.next('Code resent successfully')
          observer.complete()
        },
        (error) => {
          observer.error(error);
        }
      )
    });

  }

  async signOut() {
    this.user = { email: '', token: ''};
    this.router.navigate(['/auth/signin'])
  }

  saveUser(token:string, email:string | null = null):User{
    const newUser: User =  {
      token: token,
      email: ''
    }
    // Si el email tiene un valor, se le asigna al objeto
    if(email !== null){
      newUser.email = email;
    }
    return newUser;
  }

  setEmailVerify(value: boolean){
    this.emailVerified = value;
  }

  isEmailVerify(){
    return true;
  }

  getUser(){
    return this.user;
  }

  setLogged(value: boolean){
    this.logged = value;
  }

  isLogged(){
    return this.logged;
  }
}
