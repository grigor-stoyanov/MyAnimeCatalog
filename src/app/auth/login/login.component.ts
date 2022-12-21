import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/fetch/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalService} from "../../services/storage/local-storage.service";
import {LoaderService} from "../../shared/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('isRemembered', {static: true}) isRemembered!: ElementRef;

  user = this.userService.user
  nonFieldErrors: string[] = []


  constructor(private userService: UserService,
              private router: Router,
              private localStorage: LocalService,
              private loaderService: LoaderService
  ) {
  }


  loginHandler(form: NgForm):
    void {
    if (form.invalid) {
      return;
    }
    this.loaderService.showLoader()
    const {email, password} = form.value
    this.userService.login(email, password)
      .subscribe({
        next: (resp) => {
          if (this.isRemembered.nativeElement.checked) {
            this.localStorage.saveData('auth', resp)
          } else {
            this.localStorage.saveSessionData('auth', resp)
          }
          this.loaderService.hideLoader()
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.nonFieldErrors = err.error['non_field_errors'];
          this.loaderService.hideLoader()
        }
      })
  }
}
