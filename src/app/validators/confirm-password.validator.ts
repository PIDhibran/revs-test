import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ConfirmPasswordValidator(control: AbstractControl): any {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  console.log("password",password);
  console.log("confirmPassword", confirmPassword);
  if(password !== confirmPassword){
    return { 'match': true }
  }
  return null;
}


