import {Directive, ElementRef, forwardRef, Input, Provider} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, NgModel,
  ValidationErrors,
  Validator
} from "@angular/forms";

// const FILE_VALUE_ACCESSOR = CONST_EXPR(
//   new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => FileControlValueAccessor), multi: true})
// );


@Directive({
  selector: '[imageValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ImageValidatorDirective,
      multi: true
    }
  ],
})
export class ImageValidatorDirective implements Validator {
  size: number | undefined;

  constructor(private el: ElementRef) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const re = /(\.jpg|\.jpeg|\.png)$/i;
    const MB_LIMIT=5
    const BYTE_MB = 1024*1024
    this.size = this.el.nativeElement?.files[0]?.size
    if (!re.test(control.value)) {
      return {'invalidType': true}
    }
    if(this.size&&(this.size/(BYTE_MB))>MB_LIMIT){
      return {'invalidSize':true}
    }
    return null
  }
}
