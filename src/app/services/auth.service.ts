import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);


  constructor(
    private router: Router
  ) { }


  verifyUser(email: string, password: string) {
    // aquí debes agregar la lógica para autenticar al usuario7
    // APi
    //
    if ( email === "pavelmontes@gmail.com" && password === "pavel12345"){
      this.logged.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.logged.next(false);
    localStorage.removeItem('isLoggedIn');
  }


  isLogged(){
    return this.logged.asObservable();
  }

  private loging(){
    // Request API
  }
}
