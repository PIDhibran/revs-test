import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent {
  form: FormGroup = new FormGroup('');
  validEmail: boolean | undefined = false;
  validInput: boolean | undefined = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if(authService.isLogged()){
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.validEmail = this.form.get('email')?.invalid;
    // Si el usuario es valido
    if(this.form.valid){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.validInput = this.authService.verifyUser(email, password);

      if(!this.validInput){
        // this.validInput = false;
        this.router.navigate(['auth/double']);
      }
    }
  }

  async signIn(){
    try {
      const user = await Auth.signIn(this.email, this.password);
      console.log(user);
    } catch (error) {
      console.log('Error signing in:', error);
    }
  }

  logout(){
    this.authService.logout();
  }

}
