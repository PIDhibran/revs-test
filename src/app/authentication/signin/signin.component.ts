import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm: FormGroup = new FormGroup('');
  invalidUsername: boolean | undefined = false;
  invalidPassword: boolean | undefined = false;
  invalidInput: boolean | undefined = false;
  user:User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitSignInForm() {
    this.invalidInput = false;
    this.invalidUsername = this.signInForm.get('username')?.invalid;
    this.invalidPassword = this.signInForm.get('password')?.invalid;
    // Si el formulario tiene datos validos en los input, entra al if
    if(this.signInForm.valid){
      const username = this.signInForm.get('username')?.value;
      const password = this.signInForm.get('password')?.value;
      console.log(username);
      console.log(password);

      this.authService.signIn(username, password)
      .subscribe(
        (user) => {
          // Por lo pronto direccionar
          this.router.navigate(['dashboard'])
          console.log(user)
        },
        (error) => {
          this.invalidInput = true ;
          console.error(error);
        }
        );

      const currentUser = await Auth.currentAuthenticatedUser();
      const token = currentUser.signInUserSession.accessToken.jwtToken;
      console.log(token);
    }
  }
}
