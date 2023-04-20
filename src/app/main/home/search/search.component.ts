import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGenreOptions, getSearchValue, getYearOptions } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge } from 'rxjs';
import { addOption, removeOption, setSearchValue, typing } from '../+store/actions'
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  hidden = true;
  destroy = true;

  search$ = this.store.select(getSearchValue)
  genre$ = this.store.select(getGenreOptions)
  year$ = this.store.select(getYearOptions)
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing), map(() => true))

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  onInput(event: InputEventInit) {
    const value = this.searchInput.nativeElement.innerText.trim().split('\n').pop()

  }

  //TODO Figure out how to prevent deletion of ngFor bindings within div
  onKeyDown(event: KeyboardEvent) {
    

    if (event.key == 'Enter') {
      event.preventDefault()
      const value = this.searchInput.nativeElement.innerText.trim().split(' ').pop()

      // TODO Add Validation and tooltips during typing
      if (value?.includes(':')) {
        const [type, chip] = value.split(':')
        this.store.dispatch(addOption({ by: type, option: chip }))
      } else {
        return
      }
    }
  }

  removeChip(type: string, chip: string | number) {
    this.store.dispatch(removeOption({ by: type, option: chip }))
  }

  constructor(private store: Store, private action$: Actions) {

  }

  submitSearch() {
    return
  }

  ngOnInit(): void {
    // fromEvent(this.searchInput.nativeElement, 'input')
    //   .pipe(tap(e => this.store.dispatch(typing())), debounceTime(500), map(e => (e.target as HTMLInputElement).value))
    //   .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }


}
