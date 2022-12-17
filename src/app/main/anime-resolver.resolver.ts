import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiService} from "../services/fetch/api.service";
import {IAnime} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnimeResolverResolver implements Resolve<IAnime | null> {
  constructor(private router: Router, private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAnime | null | Observable<IAnime> | Promise<IAnime> {
    const animeId = route.params['id']
    if (!animeId) {
      this.router.navigate(['/']);
      return null;
    }
    return this.apiService.getAnime(animeId);
  }
}
