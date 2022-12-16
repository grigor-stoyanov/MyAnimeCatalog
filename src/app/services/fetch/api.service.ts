import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAnime} from '../../interfaces/anime';
import {environment} from '../../../environments/environment';



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

}
