import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[appValidatePassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatePasswordDirective,
      multi: true
    }
  ]
})
export class ValidatePasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return validatePasswordValidator(control);
  }
}

export const validatePasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordVerify = control.get('passwordVerify');

  return password && passwordVerify && password.value !== passwordVerify.value
    ? { noPasswordMatch: true }
    : null;
};
