import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IAnime} from '../../interfaces/anime';
import {environment} from '../../../environments/environment';
import {IError, IReview} from "../../interfaces";
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


  postReview(content: string, user: string, id: number) {
    return this.httpClient.post<IReview>(`${apiURL}animes/${id}/posts/`, {
      content: content, user, anime: id
    }).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        throw Error(err.statusText)
      })
    )
  }

}
