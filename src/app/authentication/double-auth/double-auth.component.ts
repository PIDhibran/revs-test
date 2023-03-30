import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-double-auth',
  templateUrl: './double-auth.component.html',
  styleUrls: ['./double-auth.component.sass']
})
export class DoubleAuthComponent {
  form: FormGroup = new FormGroup('');
  invalidToken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      token: ['', Validators.required],
    });
  }

  getUser(){
    console.log(this.authService.getUser());
  }

  submitForm(){
    const code = this.form.get('token')?.value;
    const correctToken = this.authService.verifyTokenDoubleAuth(code);

    if (this.form.valid && correctToken){
      this.router.navigate(['dashboard']);
    }
    this.invalidToken = true;
  }
}
