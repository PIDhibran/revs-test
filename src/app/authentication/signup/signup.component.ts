import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup =  new FormGroup("");
  invalidUsername: boolean | undefined = false;
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
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordConfirming]],
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
    this.invalidEmail = this.signUpForm.get('email')?.invalid;
    this.invalidUsername = this.signUpForm.get('username')?.invalid;
    this.invalidPassword = this.signUpForm.get('password')?.invalid;
    this.invalidConfirmPassword = this.signUpForm.get('confirmPassword')?.invalid;
    this.userExists = false;

    if(this.signUpForm.valid){
      const username = this.signUpForm.get('username')?.value;
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      console.log("username: " , username);
      console.log("email: " , email);
      console.log("password: " , password);

      this.authService.signUp(username, email, password)
      .subscribe(
        (response) => {
          console.log(response);
          this.userExists = false;
        },
        (error) => {
          console.error(error);
          this.userExists = true;
        }
      );
    }
  }
}
