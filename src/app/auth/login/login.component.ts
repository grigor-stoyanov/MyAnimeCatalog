import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/fetch/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalService} from "../../services/storage/local-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = this.userService.user
  nonFieldErrors: string[] = []

  constructor(private userService: UserService,
              private router: Router,
              private localStorage: LocalService) {
  }


  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const {username, password} = form.value
    this.userService.login(username, password)
      .subscribe({
        next: (resp) => {
          this.localStorage.saveData('auth', resp)
          this.router.navigate(['/'])
        },
        error: (err) => this.nonFieldErrors = err.error['non_field_errors']
      })
  }
}
