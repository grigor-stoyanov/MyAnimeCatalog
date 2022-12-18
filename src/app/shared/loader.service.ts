import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader$$ = new BehaviorSubject(false);
  loader$: Observable<boolean> = this.loader$$.asObservable();

  showLoader() {
    this.loader$$.next(true)
  }

  hideLoader() {
    this.loader$$.next(false)
  }

  constructor() {
  }
}
