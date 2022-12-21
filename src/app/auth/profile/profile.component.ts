import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../shared/loader.service";
import {FormBuilder, Validators} from "@angular/forms";
import {
  onlyLettersValidator,
} from "../../shared/validators/only-letters-validator.directive";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/fetch/user.service";
import {flattenObject} from "../../shared/flatten";
import {IAuth} from "../../interfaces";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isShown: boolean = true;
  profile;
  user$ = this.userService.user$
  user: IAuth | undefined;
  form = this.fb.group(
    {
      user: this.fb.group(
        {
          username: ['', [Validators.required, onlyLettersValidator]],
          id: [''],
          last_login: [''],
          is_superuser: [''],
          is_staff: ['']
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
    this.loaderService.hideLoader();
    this.profile = this.activatedRoute?.snapshot?.data['profile']
    if (!this.profile) {
      router.navigate(['error'])
    }
    this.form.setValue(this.profile)
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

  ngOnInit(): void {
  }

}
