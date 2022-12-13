import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToggleComponent } from './toggle/toggle.component';




@NgModule({
  declarations: [
    SpinnerComponent,
    ToggleComponent,

  ],
  imports: [
    CommonModule,
  ],
    exports: [
        SpinnerComponent,
        ToggleComponent
    ]
})
export class SharedModule { }
