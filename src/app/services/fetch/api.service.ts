import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { IAnime } from '../../interfaces/anime';
import { environment } from '../../../environments/environment';
import { IError, ILike, IProfile, IReview } from "../../interfaces";
import { catchError, EMPTY, map, Observable, throttleTime, throwError } from "rxjs";
import { CustomError, NO_MORE_POSTS, NO_POSTS } from "../../shared/custom-errors";


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

  updateAnimeLike(id: number, user_id: number, likeState: boolean | null) {
    return this.httpClient.put(`${apiURL}animes/${id}/like/`, { anime: id, user: user_id, like: likeState }, { withCredentials: true })
  }
  

  getAnimeLike(id:number){
    return this.httpClient.get<ILike|null>(`${apiURL}/animes/${id}/like/`,{withCredentials:true})
  }

  updateAnimeRating(anime_id:number,user_id:number,rating:number|null){
    return this.httpClient.put(`${apiURL}animes/${anime_id}/rating/`,{anime:anime_id,user:user_id,rating:rating},{withCredentials:true})
  }

  getPosts(id: string, page: number | null = null) {
    return this.httpClient.get<IReview[]>(`${apiURL}animes/${id}/posts/${(page ? `?page=${page}` : ``)}`, { withCredentials: true })
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


  postReview(content: string, username: string, tag: string, id: number) {
    return this.httpClient.post<IReview>(`${apiURL}animes/${id}/posts/`,
      { content: content, username, tag, anime: id }, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          if (err.error.non_field_errors) {
            throw Error(err.error.non_field_errors[0])
          }
          throw Error(err.error.content[0])
        })
      )
  }


}
