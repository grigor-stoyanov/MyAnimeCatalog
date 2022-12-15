import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToggleComponent } from './toggle/toggle.component';
import { OnlyLettersValidatorDirective } from './validators/only-letters-validator.directive';
import { ImageValidatorDirective } from './validators/image-validator.directive';
import { MatchPaswordValidatorDirective } from './validators/match-pasword-validator.directive';




@NgModule({
  declarations: [
    SpinnerComponent,
    ToggleComponent,
    OnlyLettersValidatorDirective,
    ImageValidatorDirective,
    MatchPaswordValidatorDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SpinnerComponent,
    ToggleComponent,
    OnlyLettersValidatorDirective,
    MatchPaswordValidatorDirective,
    ImageValidatorDirective
  ]
})
export class SharedModule { }
