import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged: boolean = false;
  private emailVerified: boolean = false;
  private user: User = { token: "", email: ""};
  private userExists: boolean = false;

  constructor() { }

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
