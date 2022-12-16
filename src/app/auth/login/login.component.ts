import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = this.userService.user

  constructor(private userService: UserService,
              private router: Router) {
  }


  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const {username, password} = form.value
    this.userService.login(username, password)
      .subscribe(() => this.router.navigate(['/']))
  }
}
