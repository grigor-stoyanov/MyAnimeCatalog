import {Component, HostListener, OnInit} from '@angular/core';
import {interval, map, Observable, share, startWith, Subscription, take, timer} from "rxjs";
import {UserService} from "../../services/fetch/user.service";
import {DarkModeService} from "../../services/design/dark-mode.service";
import {LocalService} from "../../services/storage/local-storage.service";
import {LoaderService} from "../../shared/loader.service";
import {ActivatedRoute, Route, Router, RouterStateSnapshot} from "@angular/router";
import {IAuth, IUser} from "../../interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  time$ = interval(1000).pipe(startWith(null),
    map(() => new Date().toLocaleString('en-US',
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      })),
    share())
  intervalId: any;
  user$:Observable<IAuth|undefined> = this.userService.user$
  label = this.themeService.currentMode$;


  logout(): void {
    this.localService.removeData('auth')
    this.localService.removeSessionData('auth')
    this.userService.logout().subscribe()
  }



  constructor(private userService: UserService,
              private themeService: DarkModeService,
              private localService: LocalService,
              private loaderService: LoaderService,
              private route: Router) {
  }

  ngOnInit(): void {
  }
}
