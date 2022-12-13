import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private currentMode$$ = new BehaviorSubject('light-mode');
  currentMode$: Observable<string> = this.currentMode$$.asObservable();

  constructor() {
  }

  changeMode(mode: string) {
    this.currentMode$$.next(mode)

  }
}
