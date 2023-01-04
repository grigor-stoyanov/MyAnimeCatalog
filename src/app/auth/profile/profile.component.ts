import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LoaderService} from "../../shared/loader.service";
import {FormBuilder, Validators} from "@angular/forms";
import {onlyLettersValidator,} from "../../shared/validators/only-letters-validator.directive";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../services/fetch/user.service";
import {IAuth, IProfile} from "../../interfaces";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {
  isShown: boolean = true;
  user$ = this.userService.user$
  user: IAuth | undefined;
  profile: any;
  routerSub: Subscription;
  form = this.fb.group(
    {
      user: this.fb.group(
        {
          username: ['', [Validators.required, onlyLettersValidator]],
          id: [''],
          last_login: [''],
          is_superuser: [''],
          is_staff: [''],
          user_tag: ['']
        }),
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      avatar: [''],
      birthday: [''],
      created: [''],
      description: ['', [Validators.maxLength(200)]]
    }
  )

  constructor(private loaderService: LoaderService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {
    this.routerSub =
      this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.loaderService.hideLoader();
          this.profile = activatedRoute.snapshot.data['profile']
          this.form.setValue(this.profile)
        }
      })
  }

  saveProfile() {
    if (this.form.invalid) {
      return
    }
    this.user$.subscribe(user => this.user = user)

    this.userService.putProfile(this.user?.username!, this.form.value)
      .subscribe(
        {next: (value => value)})

  }

  ngOnDestroy() {
    this.routerSub.unsubscribe()
  }
}
