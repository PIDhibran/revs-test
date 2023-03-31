import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.sass']
})
export class VerificationComponent {
  verifyForm: FormGroup = new FormGroup('');
  requiredCode: boolean | undefined = false
  invalidResendCode: boolean = false;
  invalidCode: boolean = false;

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
    this.invalidCode =  this.verifyForm.get('code')?.invalid;
    if(this.verifyForm.valid){
      const code =  this.verifyForm.get('code')?.value;
      console.log(code);
      this.authService.confirmVerification(code)
      .subscribe(
        (response) => {
          console.log(response)
          this.invalidCode = false;
        },
        (error) => {
          this.invalidCode = true;
          console.log(error)
        }
      );
    }
  }

  resendCode(){
    debugger
    this.authService.resendValidateCode()
    .subscribe(
      (response) => {
        console.log("response", response);
        this.invalidResendCode = false;
      },
      (error) => {
        this.invalidResendCode = true;
        console.log(error);
      }
    );
  }
}
