import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IAnime, IProfile} from "../interfaces";
import {ApiService} from "../services/fetch/api.service";
import {LoaderService} from "../shared/loader.service";
import {UserService} from "../services/fetch/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverResolver implements Resolve<IProfile | null> {

  constructor(private router: Router, private userService: UserService, private loaderService: LoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProfile | null | Observable<IProfile> | Promise<IProfile> {
    const profile = route.params['pk']

    if (!profile) {
      this.loaderService.hideLoader()
      this.router.navigate(['/']);
      return null;
    }
    return this.userService.getProfile(profile)
  }
}
