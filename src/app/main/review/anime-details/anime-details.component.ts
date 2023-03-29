import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { throttleTime, Subject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/fetch/api.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { IAnime, IAuth } from "../../../interfaces";
import { LoaderService } from "../../../shared/loader.service";
import { ILike } from '../../../interfaces';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {
  anime!: IAnime;
  user!: IAuth | undefined;
  likeState$$ = new Subject<any>();
  likeState: boolean | null | undefined;


  likeHandler() {
    this.likeState = (this.likeState == null) ? true : (this.likeState == false) ? true : null
    const body = {
      anime_id: this.anime.id,
      user_id: this.user!.pk,
      likeState: this.likeState
    }
    this.likeState$$.next(body)
  }



  dislikeHandler() {
    this.likeState = (this.likeState == null) ? false : (this.likeState == true) ? false : null
    const body = {
      anime_id: this.anime.id,
      user_id: this.user!.pk,
      likeState: this.likeState
    }
    this.likeState$$.next(body)
  }

  constructor(private activatedRoute: ActivatedRoute, router: Router,
    private loaderService: LoaderService, private apiService: ApiService,
    private userService: UserService) {
    this.loaderService.hideLoader()
    this.anime = this.activatedRoute?.snapshot?.data['anime']
    if (!this.anime) {
      router.navigate(['error'])
    }
    this.apiService.getAnimeLike(this.anime.id).subscribe(val => this.likeState = val?.like)
    this.userService.user$.subscribe(val => this.user = val)
    this.likeState$$.pipe(throttleTime(1000),
      switchMap(body => this.apiService.updateAnimeLike(body.anime_id, body.user_id, body.likeState))).subscribe(x => console.log(x))


  }


  ngOnInit(): void {
  }

}
