import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[onlyLetters]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: OnlyLettersValidatorDirective,
      multi: true
    }
  ]
})
export class OnlyLettersValidatorDirective implements Validator {
  validate(control: AbstractControl<string>): ValidationErrors | null {
    const re = /^[A-Za-z]+$/
    return (control.value == '' || re.test(control.value)) ? null : {'onlyLetters': true};
  }

  constructor() {
  }

}

export function onlyLettersValidator(): ValidatorFn {
  return (control) => {
    const re = /^[A-Za-z]+$/
    return (control.value == '' || re.test(control.value)) ? null : {'onlyLetters': true};
  }
}
