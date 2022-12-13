import {Component, OnInit} from '@angular/core';
import {interval, map, share, startWith, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  time$ = interval(1000).pipe(startWith(null),map(() => new Date().toLocaleString()),share())
  intervalId: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
