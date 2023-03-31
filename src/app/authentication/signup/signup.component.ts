import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
 import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent{
  formSignUp: FormGroup =  new FormGroup("");
  invalidName: boolean | undefined = false;
  invalidEmail: boolean | undefined = false;
  invalidPassword: boolean | undefined = false;
  invalidConfirmPassword: boolean | undefined  = false;
  invalidPasswordsMatch: boolean | undefined = false;
  userExists: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.formSignUp = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordConfirming]],
    }, {

    });
  }

  private passwordConfirming(control: AbstractControl): any {
    if (control && control.parent) {
      const password = control.parent.get('password');
      const confirmPassword = control.parent.get('confirmPassword');
      if (!password || !confirmPassword) {
        return null;
      }
      return password.value === confirmPassword.value ? null : { passwordNotMatch: true };
    }
    return null;
  }


  submitSignUpForm(){
    this.invalidEmail = this.formSignUp.get('email')?.invalid;
    this.invalidName = this.formSignUp.get('username')?.invalid;
    this.invalidPassword = this.formSignUp.get('password')?.invalid;
    this.invalidConfirmPassword = this.formSignUp.get('confirmPassword')?.invalid;
    this.userExists = false;
    // Crear validador para las dos passwords


    if(this.formSignUp.valid){
      const username = this.formSignUp.get('username')?.value;
      const email = this.formSignUp.get('email')?.value;
      const password = this.formSignUp.get('password')?.value;
      console.log("username: " , username);
      console.log("email: " , email);
      console.log("password: " , password);

      this.authService.signUp(username, email, password)
      .subscribe(
        (user) => {
          // console.log(user);
          this.userExists = false;
        },
        (error) => {
          this.userExists = true;
          // console.log(error);
        }
      );
    }
  }
}
