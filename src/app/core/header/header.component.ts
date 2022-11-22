import {Component, OnInit} from '@angular/core';
import {map, share, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  time = new Date().toLocaleString();
  intervalId: any;

  constructor() {
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date().toLocaleString();
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
