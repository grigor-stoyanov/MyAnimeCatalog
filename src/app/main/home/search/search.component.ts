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
  options = ['genre', 'year']
  search$ = this.store.select(getSearchValue)
  genre$ = this.store.select(getGenreOptions)
  year$ = this.store.select(getYearOptions)
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing), map(() => true))

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  onInput(event: InputEventInit) {
    const input = this.searchInput.nativeElement
    // TODO add async dispatching with proper validation
    const value = input.value.trim().split('\n').pop()
    input.style.width = (input.value.length + 1) + "ch";
  }

  onKeyDown(event: KeyboardEvent) {


    if (event.key == 'Enter') {
      event.preventDefault()
      const input = this.searchInput.nativeElement
      const input_breakdown = input.value.trim().split(' ')
      const value = input_breakdown.pop()
      if (value?.includes(':')) {
        const [type, chip] = value.split(':')
        // TODO add validation before u dispatch the event
        this.store.dispatch(addOption({ by: type, option: chip }))
        input.value = input_breakdown.join(' ')
        input.style.width = (input.value.length + 1) + 'ch'
      } else {
        // This statement should become redundant with NgRx Validation
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

  suggestionHandler(option: string, $event: Event) {
    $event.preventDefault();
    const input = this.searchInput.nativeElement;
    input.value += ` ${option}:`
    input.style.width = (input.value.length + 1) + "ch";
  }

  ngOnInit(): void {
    // fromEvent(this.searchInput.nativeElement, 'input')
    //   .pipe(tap(e => this.store.dispatch(typing())), debounceTime(500), map(e => (e.target as HTMLInputElement).value))
    //   .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }


}
