import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-double-auth',
  templateUrl: './double-auth.component.html',
  styleUrls: ['./double-auth.component.scss']
})
export class DoubleAuthComponent {
  dfaForm: FormGroup = new FormGroup('');
  invalidCode: boolean | undefined = false;
  requiredCode: boolean | undefined = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.dfaForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  verifyCode(){
    this.requiredCode = this.dfaForm.get('code')?.valid;
  }

}
