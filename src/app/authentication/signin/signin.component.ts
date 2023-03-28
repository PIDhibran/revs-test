import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent {
  public form: FormGroup = new FormGroup('');
  public validEmail: boolean | undefined = false;
  public validInput: boolean | undefined = false;

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

    if(this.form.valid){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.validInput = this.authService.verifyUser(email, password);

      if(!this.validInput){
        // this.validInput = false;
        this.router.navigate(['/dashboard']);
      }
    }
  }

  logout(){
    this.authService.logout();
  }

}
