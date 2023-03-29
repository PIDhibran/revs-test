import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private logged = new BehaviorSubject<boolean>(false);


  constructor(
    private router: Router
  ) { }

  async signIn(username:string, email: string,  password:string ){
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        },
      });
      console.log("enviado");
      console.log(user);
    } catch (error) {
      console.log('Error signing in:', error);
    }
  }

  verifyUser(email: string, password: string) {
    // aquí debes agregar la lógica para autenticar al usuario7
    // APi
    //
    if ( email === "pavelmontes@gmail.com" && password === "pavel12345"){
      // this.logged.next(true);
      // localStorage.setItem('isLoggedIn', 'false');
      return false;
    }
    return true;
  }

  verifyTokenDoubleAuth(token: string){
    if(token === '123'){
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    // this.logged.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth/signin'])
  }



  isLogged(){
    const user = localStorage.getItem('isLoggedIn')
    if (user){
      return true
    }
    return false;
  }


}
