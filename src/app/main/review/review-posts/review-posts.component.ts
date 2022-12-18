import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../../../services/fetch/api.service";
import {ActivatedRoute} from "@angular/router";
import {IAnime, IError, IReview} from "../../../interfaces";
import {UserService} from "../../../services/fetch/user.service";


@Component({
  selector: 'app-review-posts',
  templateUrl: './review-posts.component.html',
  styleUrls: ['./review-posts.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ReviewPostsComponent implements OnInit {
  user = this.userService.user$
  posts: IReview[] = [];
  error: IError | null = null;
  errorDetail: string | undefined;
  getReviewError: string | undefined;
  isLoading: boolean = false;
  pageCounter: number | null = null;

  loadPostHandler() {
    this.isLoading = true;
    this.getReviewError = undefined;
    const id = this.activatedRoute.snapshot.params['id']
    this.apiService.getPosts(id, this.pageCounter)
      .subscribe({
        next: (data) => {
          this.posts?.push(...data);
          this.error = null;
          this.isLoading = false;
          this.pageCounter = (!this.pageCounter) ? 2 : this.pageCounter += 1
        },
        error: (err) => {
          this.error = err.error;
          this.errorDetail = err.error['detail']
          this.isLoading = false;
          if (this.errorDetail === 'No more Posts available') {
            this.error = null;
            this.getReviewError = this.errorDetail
          }
        }
      })
  }

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {

  }

}
