import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, throttleTime,switchMap } from 'rxjs';
import { IAnime, IAuth, IUser } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/fetch/api.service';
import { UserService } from 'src/app/services/fetch/user.service';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  ratingState$$ = new Subject<any>()
  ratingstate: null | number = null
  @Input() user!:IAuth|undefined;
  @Input() anime!:IAnime;

  submitHandler(form: any) {
    const body = {
      anime_id: this.anime.id,
      user_id: this.user!.pk,
      rating: parseInt(form.value.rating)
    }
    this.ratingState$$.next(body)
  }


  constructor(private apiService: ApiService, private userService: UserService) {
    this.ratingState$$
    .pipe(throttleTime(1000),switchMap(body => this.apiService.updateAnimeRating(body.anime_id,body.user_id,body.rating)))
    .subscribe(x => console.log(x))

  }

  ngOnInit(): void {
  }

}
