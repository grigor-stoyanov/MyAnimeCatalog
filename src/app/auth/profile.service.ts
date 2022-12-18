import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile$$= new BehaviorSubject(null)
  profile$ = this.profile$$.asObservable()


  constructor() {

  }
}
