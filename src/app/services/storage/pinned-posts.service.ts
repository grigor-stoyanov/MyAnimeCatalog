import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { IReview } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PinnedPostsService {
  private pinned_reviews$$ = new BehaviorSubject<Array<IReview>>([])
  pinned_reviews$ = this.pinned_reviews$$.asObservable().pipe(distinctUntilChanged())
  

  pinReview(review:IReview){
    this.pinned_reviews$$.next(this.pinned_reviews$$.getValue()?.concat([review]))
  }

  unpinReview(review:IReview){
    const arr: Array<IReview> = this.pinned_reviews$$.getValue()
    arr.forEach((item,index)=>{
      if(item.id===review.id){
        arr.splice(index,1)
      }
    })
    this.pinned_reviews$$.next(arr)
  }

  constructor() { }
}
