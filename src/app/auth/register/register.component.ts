import {Component, OnInit} from '@angular/core';
import {Form, NgForm} from "@angular/forms";
import {UserService} from "../../services/fetch/user.service";
import {Route, Router} from "@angular/router";
import {catchError} from "rxjs";
import {LocalService} from "../../services/storage/local-storage.service";
import {LoaderService} from "../../shared/loader.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  avatarFile: File | string = '';
  internalEmailError: string[] | undefined;
  internalUsernameError: string[] | undefined;
  internalAvatarError: string[] | undefined;

  // TODO Make File Accessor Directive for this.
  changeName(ev: any) {
    try {
      ev.target.parentNode.dataset['text'] = ev.target.files[0].name
      this.avatarFile = ev.target.files[0]
    } catch (err) {
      ev.target.parentNode.dataset['text'] = 'Upload Avatar (Optional)'
    }
  }

  constructor(private userService: UserService,
              private router: Router,
              private localStorage: LocalService,
              private loaderService: LoaderService) {
  }

  registerHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.loaderService.showLoader()

    const {email, username, password,} = form.value
    let formData = new FormData();
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('avatar', this.avatarFile)

    this.userService.register(formData)
      .subscribe({
        next: (resp) => {
          this.localStorage.saveSessionData('auth', resp)
          this.loaderService.hideLoader()
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.loaderService.hideLoader()
          const {email, password, username, avatar} = err.error
          this.internalEmailError = email;
          this.internalUsernameError = username;
          this.internalAvatarError = avatar
        }
      })
  }
}
