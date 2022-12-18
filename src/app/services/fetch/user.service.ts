import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, Observable, tap} from "rxjs";
import {IAuth, IProfile, IUser} from "../../interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocalService} from "../storage/local-storage.service";

const apiURL = environment['apiURL']

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<IAuth | undefined>(undefined)
  user$: Observable<IAuth | undefined> = this.user$$.asObservable()
  user: IUser | IAuth | null = null

  constructor(private http: HttpClient, private localStorage: LocalService) {
    const auth = this.localStorage.getData('auth')
    const sauth = this.localStorage.getSessionData('auth')
    if (auth) {
      this.user$$.next(auth)
    } else if (sauth) {
      this.user$$.next(sauth)
    } else {
      this.user$$.next(undefined)
    }
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
      .pipe(tap(user => this.user$$.next(user)));
  }

  logout() {
    this.user$$.next(undefined);
    return this.http.get(`${apiURL}logout/`, {withCredentials: true})
  }

  getProfile(pk: number) {
    return this.http.get<IProfile>(`${apiURL}profile/${pk}/`, {withCredentials: true})
      .pipe(
        catchError((err, catch_) => {
            throw Error(err.statusText)
          }
        )
      )
  }

  putProfile(pk: number, body: any) {

    return this.http.put<IProfile>(`${apiURL}profile/${pk}/`,body , {withCredentials: true})
  }
}
