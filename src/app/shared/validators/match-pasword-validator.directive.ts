import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";


@Directive({
  selector: '[matchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPaswordValidatorDirective,
      multi: true
    }
  ]
})
export class MatchPaswordValidatorDirective implements Validator {
  @Input() matchPassword!: string;


  validate(control: AbstractControl<string>): ValidationErrors | null {
    if (control == null || this.matchPassword == null) {
      return null;
    }

    return (this.matchPassword == control.value) ? null : {'matchPassword': true}
  }

  constructor() {
  }

}
