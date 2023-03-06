import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IAnime} from '../../interfaces/anime';
import {environment} from '../../../environments/environment';
import {IError, IProfile, IReview} from "../../interfaces";
import {catchError, EMPTY, map, Observable, throwError} from "rxjs";
import {CustomError, NO_MORE_POSTS, NO_POSTS} from "../../shared/custom-errors";


const apiURL = environment['apiURL']

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  loadAnimes(page: number | null = null) {
    return this.httpClient.get<IAnime[]>(`${apiURL}animes/${(page ? `?page=${page}` : ``)}`)
  }

  getAnime(id: number) {
    return this.httpClient.get<IAnime>(`${apiURL}animes/${id}`)
      .pipe(catchError(
        (err, cauth) => [null]
      ))
  }

  getPosts(id: string, page: number | null = null) {
    return this.httpClient.get<IReview[]>(`${apiURL}animes/${id}/posts/${(page ? `?page=${page}` : ``)}`, {withCredentials: true})
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          if (err.status === 404) {
            throw new CustomError(NO_MORE_POSTS)
          }
          throw new CustomError({
            detail: `${err.statusText}`
          })
        }),
        map((res): IReview[] => {
          if (!res.length) {
            throw new CustomError(NO_POSTS)
          } else {
            return res
          }
        })
      )
  }


  postReview(content: string, username: string,tag:string, id: number) {
    return this.httpClient.post<IReview>(`${apiURL}animes/${id}/posts/`,
      {content: content, username,tag, anime: id}, {withCredentials: true})
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          if (err.error.non_field_errors){
            throw Error(err.error.non_field_errors[0])
          }
          throw Error(err.error.content[0])
        })
      )
  }


}
