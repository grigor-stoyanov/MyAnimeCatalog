import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, tap} from "rxjs";
import {IUser} from "../interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const apiURL = environment['apiURL']

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

  login(username: string, password: string) {
    return this.http.post<IUser>(`${apiURL}login/`, {
      username, password
    }).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  register(formData: any) {
    // const headers = new HttpHeaders().append('Content-Type', 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    // const filename = (formData.get('avatar').name) ? formData.get('avatar').name : '';
    // headers.append('Content-Disposition', `Content-Disposition: attachment; filename=${filename}`);
    return this.http.post<IUser>(`${apiURL}register/`,
      formData)
      .pipe(tap(user => this.user$$.next(user as any)));
  }
}
