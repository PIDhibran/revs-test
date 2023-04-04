import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged: boolean = false;
  private emailVerified: boolean = false;
  private user: User = { token: "", email: "", username: ""};
  private userExists: boolean = false;

  constructor(
    private router:Router
  ) { }

  //Sign Up
  signUp(username:string, email: string, password:string):Observable<any>{
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
          this.logged = true;

          const user = this.saveUser("", email, username);
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigate(['auth/verification']);



          observer.next(response);
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
  signIn(username:string, password:string):Observable<any> {
    return new Observable(observer => {
      Auth.signIn(username, password).then(
        (response) => {
          this.logged = true;
          this.user = this.saveUser("", username);

          observer.next(response);
          observer.complete();
        },
        (error) => {
          this.logged = false;
          observer.error(error);
        }
      );
    });
  }


  saveUser(token:string, email:string = '', username:string = ''):User{
    const newUser: User =  {
      token: token,
      email: '',
      username: ''
    }
    // Si el email tiene un valor, se le asigna al objeto
      newUser.email = email;
      newUser.username = username;

    return newUser;
  }

  // Verificaction
  confirmVerification(code:string):Observable<any> {
    const user:any = this.getSaveUser();

    return new Observable(observer => {
      Auth.confirmSignUp(user.username, code).then(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  resendValidateCode(): Observable<any>{
    const user:any = this.getSaveUser();

    return new Observable(observer => {
      Auth.resendSignUp(user.email).then(
        (response) => {
          observer.next(response)
          observer.complete()
        },
        (error) => {
          observer.error(error);
        }
      )
    });
  }

  getSaveUser(){
    let user:any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
    } else {
      user = this.saveUser("", "", "");
    }
    console.log(user);
    return user;
  }

}
