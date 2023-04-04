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
  requiredCode: boolean | undefined = false;
  validResendCode: boolean | undefined = false;
  invalidResendCode: boolean = false;
  invalidCode: boolean | undefined = false;

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
    this.requiredCode = this.verifyForm.get('code')?.invalid;
    this.invalidCode = false;
    if(this.verifyForm.valid){
      const code =  this.verifyForm.get('code')?.value;
      this.authService.confirmVerification(code)
      .subscribe(
        (response) => {
          this.authService.deleteSaveUser();
          this.router.navigate(['dashboard']);
          // console.log(response)
        },
        (error) => {
          this.invalidCode = true;
          // console.log(error)
        }
      );
    }
  }

  resendCode(){
    this.validResendCode = false;
    this.invalidResendCode = false;

    this.authService.resendValidateCode()
    .subscribe(
      (response) => {
        this.invalidResendCode = true;
        // console.log(response);
      },
      (error) => {
        this.validResendCode = true;
        // console.log(error);
      }
    );
  }

}
