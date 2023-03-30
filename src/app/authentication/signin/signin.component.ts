import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent {
  signInForm: FormGroup = new FormGroup('');
  validEmail: boolean | undefined = false;
  invalidInput: boolean | undefined = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if(authService.isLogged() && authService.isEmailVerify()){
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitSignInForm() {
    this.validEmail = this.signInForm.get('username')?.invalid;
    if(this.signInForm.valid){
      const username = this.signInForm.get('username')?.value;
      const password = this.signInForm.get('password')?.value;
      this.authService.signIn(username, password);
    } else {
      console.log("Usuario invalido");
    }
  }
}
