import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiService} from "../services/fetch/api.service";
import {IAnime} from "../interfaces";
import {LoaderService} from "../shared/loader.service";

@Injectable({
  providedIn: 'root'
})
export class AnimeResolverResolver implements Resolve<IAnime | null> {
  constructor(private router: Router, private apiService: ApiService, private loaderService: LoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const animeId = route.params['id']

    if (!animeId) {
      this.loaderService.hideLoader()
      this.router.navigate(['/']);
      return null;
    }

    return this.apiService.getAnime(animeId);
  }
}
