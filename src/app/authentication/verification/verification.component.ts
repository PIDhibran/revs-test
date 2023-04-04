import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  verifyForm: FormGroup = new FormGroup('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.verifyForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  verifyEmail(){
    if(this.verifyForm.valid){
      const code =  this.verifyForm.get('code')?.value;
      console.log(code);


      this.authService.confirmVerification(code)
      .subscribe(
        (response) => {
          localStorage.removeItem('user');
          this.router.navigate(['dashboard']);
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  resendCode(){
    this.authService.resendValidateCode()
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
