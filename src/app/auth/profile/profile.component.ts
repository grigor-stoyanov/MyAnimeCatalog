import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LoaderService} from "../../shared/loader.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {onlyLettersValidator,} from "../../shared/validators/only-letters-validator.directive";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../services/fetch/user.service";
import {IAuth, IProfile, IUser} from "../../interfaces";
import {filter, map, pairwise, Subscription} from "rxjs";
import {NONE_TYPE} from "@angular/compiler";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy, OnInit {
  isShown: boolean = true;
  user$ = this.userService.user$
  user: IAuth | undefined;
  profile: any;
  routerSub: Subscription;
  formData = new FormData();
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

  editHandler() {
    this.isShown = !this.isShown
    this.form.setValue(this.profile)
  }


  saveProfile() {
    if (this.form.invalid) {
      return
    }
    this.user$.subscribe(user => this.user = user)

    this.userService.putProfile(this.user!, this.formData)
      .subscribe(
        {
          next: ((value: any) => {
              this.router.navigate(['auth', 'profile', `${value.user.username}%23${value.user.user_tag}`])
              this.profile = value
            }
          )
        })
    this.isShown = true;
    this.form.setValue(this.profile)
  }

  populateFormData(formData: FormData, values: any) {
    for (const key in values) {
      if (key == 'user') {
        formData.append('username', values[key].username)
        continue
      }
      if (key == 'avatar') {
        if (values[key] != null) {
          formData.append(key, values[key][0])
        }
        continue;
      }
      formData.append(key, values[key])
    }
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        pairwise(),
        map(([oldState, newState]) => {
          let changes: any = {};
          for (const key in newState) {
            if (oldState[key as keyof typeof oldState] != newState[key as keyof typeof newState]) {
              changes[key] = newState[key as keyof typeof newState]
            }
          }
          return changes;
        }),
        filter(changes => Object.keys(changes).length !== 0 && !this.form.invalid)
      ).subscribe(
      value => {
        this.populateFormData(this.formData, value)
        console.log(this.formData)
      }
    );
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe()
  }
}
