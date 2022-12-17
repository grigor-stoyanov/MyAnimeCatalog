import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from "./review/review.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../auth/login/login.component";
import {AnimeDetailsComponent} from './anime-details/anime-details.component';
import {SharedModule} from "../../shared/shared.module";
import {NewReviewComponent} from './new-review/new-review.component';
import {ReviewPostsComponent} from './review-posts/review-posts.component';
import {PostCommentsComponent} from './post-comments/post-comments.component';
import {CKEditorModule, CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {FormsModule} from "@angular/forms";
import {AnimeResolverResolver} from "../anime-resolver.resolver";

const routes: Routes = [
  {
    path: ':id',
    component: ReviewComponent,
    resolve: {
      anime: AnimeResolverResolver
    }
  }
]

@NgModule({
  declarations: [ReviewComponent, AnimeDetailsComponent, NewReviewComponent, ReviewPostsComponent, PostCommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    FormsModule
  ]
})
export class ReviewModule {
}
