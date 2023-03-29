import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToggleComponent } from './toggle/toggle.component';
import { OnlyLettersValidatorDirective } from './validators/only-letters-validator.directive';
import { ImageValidatorDirective } from './validators/image-validator.directive';
import { MatchPaswordValidatorDirective } from './validators/match-pasword-validator.directive';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { Error404Component } from '../core/error404/error404.component';
import { RouterModule } from "@angular/router";
import { LoaderComponent } from './loader/loader.component';
import { SlideInOutDirectiveDirective } from './animation/animation-accordion.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PinnedPostsService } from '../services/storage/pinned-posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpinnerComponent,
    ToggleComponent,
    OnlyLettersValidatorDirective,
    ImageValidatorDirective,
    MatchPaswordValidatorDirective,
    StarRatingComponent,
    Error404Component,
    LoaderComponent,
    SlideInOutDirectiveDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
  ,
  exports: [
    SpinnerComponent,
    ToggleComponent,
    OnlyLettersValidatorDirective,
    MatchPaswordValidatorDirective,
    ImageValidatorDirective,
    StarRatingComponent,
    LoaderComponent,
    SlideInOutDirectiveDirective
  ]
  ,
  providers: [
    PinnedPostsService
  ]
})
export class SharedModule {
}
