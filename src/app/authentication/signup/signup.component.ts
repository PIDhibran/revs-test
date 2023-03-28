import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
 import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateUser, NewUser, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent{
  form: FormGroup =  new FormGroup("");
  validName: boolean = false;
  validEmail: boolean = false;
  validPassword: boolean = false;
  validConfirmPassword: boolean = false;
  newUser: NewUser | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator]],
    },);
  }

  private confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password =  control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  async submitForm(){
    if(this.form.valid){
      const username = this.form.get('username')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.newUser = this.saveCreatedUser(username, email, password);

      try {
        this.newUser = await Auth.signUp({
          username,
          password,
          attributes:{
            email
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
        })
        console.log('successfull');
      } catch (error) {
        console.log('error signing up:', error);
      }

      console.log(this.createdUser);
    }
  }



  private saveCreatedUser(username:string, email:string, password:string): CreateUser{
    const newUser = {
      username: username,
      email: email,
      password: password
    };

    return newUser;
  }

}
