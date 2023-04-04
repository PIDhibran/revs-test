import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm: FormGroup = new FormGroup('');
  invalidEmail: boolean | undefined = false;
  invalidPassword: boolean | undefined = false;
  invalidInput: boolean | undefined = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async submitSignInForm() {
    this.invalidInput = false;
    this.invalidEmail = this.signInForm.get('email')?.invalid;
    this.invalidPassword = this.signInForm.get('password')?.invalid;
    // Si el formulario tiene datos validos en los input, entra al if
    if(this.signInForm.valid){
      const email = this.signInForm.get('email')?.value;
      const password = this.signInForm.get('password')?.value;
      // Ejecuta la funcion de signin
      this.authService.signIn(email, password)
      .subscribe(
        (response) => {
          console.log(response)
          this.invalidInput = false;
        },
        (error) => {
          this.invalidInput = true ;
          console.error(error);
        }
      );
    }

  }
}
