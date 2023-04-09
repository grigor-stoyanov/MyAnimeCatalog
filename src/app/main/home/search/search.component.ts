import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSearchValue } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge } from 'rxjs';
import { setSearchValue, typing } from '../+store/actions'
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  hidden = true;
  destroy = true;
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing),map(()=>true))

  @ViewChild('searchInput', { static: true }) search!: ElementRef<HTMLInputElement>;
  search$ = this.store.select(getSearchValue)

  constructor(private store: Store,private action$:Actions) {
    this.search$.subscribe(console.log)
  }

  ngOnInit(): void {
    fromEvent(this.search.nativeElement, 'input')
      .pipe(tap(e => this.store.dispatch(typing())), debounceTime(500), map(e => (e.target as HTMLInputElement).value))
      .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }

}
