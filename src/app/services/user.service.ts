import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, tap} from "rxjs";
import {IUser} from "../interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //TODO Create Active User with Remember Session (maybe in state)
  //TODO Memorize Light/Dark Mode as well in same state
  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined)
  user$ = this.user$$.asObservable().pipe(filter((val): val is IUser | null => val !== undefined))
  user: IUser | null = null

  constructor(private http: HttpClient) {
    this.user$.subscribe(user => {
      this.user = user
    })
  }
  login(email: string, password: string) {
    return this.http.post<IUser>('api/login', {
      email, password
    }).pipe(
      tap(user => this.user$$.next(user))
    );
  }
}
