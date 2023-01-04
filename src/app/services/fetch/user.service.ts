import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, Observable, tap} from "rxjs";
import {IAuth, IProfile, IUser} from "../../interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocalService} from "../storage/local-storage.service";
import {Router} from "@angular/router";

const apiURL = environment['apiURL']

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<IAuth | undefined>(undefined)
  user$: Observable<IAuth | undefined> = this.user$$.asObservable()
  user: IUser | IAuth | null = null

  constructor(private http: HttpClient, private localStorage: LocalService, private router: Router) {
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


  login(email: string, password: string) {
    return this.http.post<IAuth>(`${apiURL}login/`, {
      email, password
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

  getProfile(username: string) {
    username = username.replace('#', '%23')
    return this.http.get<IProfile>(`${apiURL}profile/${username}/`, {withCredentials: true})
      .pipe(
        catchError((err, catch_) => {
            if (err.status === 404) {
              this.router.navigate(['error'])
            }
            throw Error(err.statusText)
          }
        )
      )
  }

  putProfile(username: string, body: any) {
    body.user = body['user'].username
    return this.http.put<IProfile>(`${apiURL}profile/${username}/`, body, {withCredentials: true})
  }
}
