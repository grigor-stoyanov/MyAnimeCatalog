import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/fetch/user.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  user = this.userService.user$

  constructor(private userService: UserService) {
    this.user = this.userService.user$
  }

  ngOnInit(): void {
  }

}
