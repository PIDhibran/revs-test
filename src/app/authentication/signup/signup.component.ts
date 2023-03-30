import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
 import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
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

      this.authService.signUp(username, email, password);
    }
  }





}
