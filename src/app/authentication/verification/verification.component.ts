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
  tokenInvalid: boolean = false;

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

  // checkVerifyCode(){
  //   if(this.verifyForm.valid){
  //     const code = this.verifyForm.get('code')?.value;

  //     if(code === "123456"){
  //       this.authService.setEmailVerify(true);
  //       this.router.navigate(['/dashboard'])
  //     }
  //       this.authService.setEmailVerify(false);
  //   }
  // }

  verifyEmail(){
    if(this.verifyForm.valid){
      const code =  this.verifyForm.get('code')?.value;
      debugger
      this.authService.confirmVerification(code)
    ;
    }
  }

  resendCode(){
    this.authService.resendValidateCode();
  }

}
