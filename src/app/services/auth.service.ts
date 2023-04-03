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
  private user: User = { token: "", email: ""};
  private userExists: boolean = false;

  constructor(
    private router:Router
  ) { }

  //Sign Up
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


}
