import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, tap} from "rxjs";
import {IAuth, IUser} from "../../interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocalService} from "../storage/local-storage.service";

const apiURL = environment['apiURL']

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<undefined | null | IUser | IAuth>(undefined)
  user$ = this.user$$.asObservable().pipe(filter((val): val is IUser | null => val !== undefined))
  user: IUser | IAuth | null = null

  constructor(private http: HttpClient, private localStorage: LocalService) {
    this.user$$.next(this.localStorage.getData('auth'))
  }


  login(username: string, password: string) {
    return this.http.post<IAuth>(`${apiURL}login/`, {
      username, password
    }).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  register(formData: FormData) {
    return this.http.post<IAuth>(`${apiURL}register/`,
      formData)
      .pipe(tap(user => this.user$$.next(user as any)));
  }

  logout() {
    this.user$$.next(null);
    return this.http.get(`${apiURL}logout/`, {withCredentials: true})
  }
}
