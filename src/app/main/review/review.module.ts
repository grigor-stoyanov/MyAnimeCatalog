import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReviewComponent} from "./review/review.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../auth/login/login.component";
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import {SharedModule} from "../../shared/shared.module";
import { NewReviewComponent } from './new-review/new-review.component';
import { ReviewPostsComponent } from './review-posts/review-posts.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';

const routes:Routes=[
  {
    path: '',
    component: ReviewComponent,
  }
]

@NgModule({
  declarations: [ReviewComponent, AnimeDetailsComponent, NewReviewComponent, ReviewPostsComponent, PostCommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewModule { }
