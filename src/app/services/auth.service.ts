import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emailVerified: boolean = false;

  constructor(
    private router:Router
  ) { }

  //Sign Up
  signUp(username:string, email: string, password:string, number:string):Observable<any>{
    return new Observable(observer => {
      Auth.signUp({
        username,
        password,
        attributes: {
          email,
          nickname: username,
          phone_number: `+52${number}`
        },
      }).then(
        (response) => {

          this.saveUser("", email, username);
          this.router.navigate(['auth/verification']);

          observer.next(response);
          observer.complete();
        },
        (error) => {
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
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  currentUser():Observable<any> {
    return new Observable(observer => {
      Auth.currentAuthenticatedUser().then(
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
      Auth.resendSignUp(user.username).then(
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



  saveUser(token:string, email:string = '', username:string = ''){
    const newUser: User =  {
      token: token,
      email: email,
      username: username
    }
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  getSaveUser(){
    let user:any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
    }
    console.log(user);
    return user;
  }

  deleteSaveUser(){
    localStorage.removeItem('user');
  }

  isLogged(){
    const user = this.getSaveUser();
    if(user){
      return true;
    }
    return false;
  }

}
