import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class SideScrollService {
  scrollX = new BehaviorSubject(0);
  scrollX$ = this.scrollX.asObservable();

  constructor() {
  }

  updateScroll(value: number): void {
    this.scrollX.next(value);
  }
}
