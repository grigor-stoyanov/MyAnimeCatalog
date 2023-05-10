import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGenreOptions, getSearchValue, getYearOptions, getOptionValidation } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge, filter, withLatestFrom } from 'rxjs';
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
  isValid$ = this.store.select(getOptionValidation)
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing), map(() => true))

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

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
    this.store.dispatch(setSearchValue({ search: input.value }))
    input.style.width = (input.value.length + 1) + "ch";
  }

  ngOnInit(): void {
    const inputElement = this.searchInput.nativeElement

    fromEvent<KeyboardEvent>(inputElement, 'keydown')
      .pipe(
        filter((e) => e.key === 'Enter'),
        withLatestFrom(this.isValid$),
      ).subscribe(([event, isValid]: [_KeyboardEvent, Boolean]) => {
        event.preventDefault()
        if (isValid) {
          const value = (event.target as HTMLInputElement).value.split(' ')
          const [type, chip] = value.pop()!.split(':')
          const search = value.join(' ')
          inputElement.value = search
          inputElement.style.width = (search.length +1)+'ch'
          this.store.dispatch(addOption({ by: type, option: chip }))
          this.store.dispatch(setSearchValue({ search }))
        }
        else {
          console.log('No')
        }
      })

    fromEvent(inputElement, 'input')
      .pipe(tap(e => {
        // if the value contains exactly option: provide suggestion
        this.store.dispatch(typing());
        inputElement.style.width = (inputElement.value.length + 1) + "ch";
      }), debounceTime(200), map(e => (e.target as HTMLInputElement).value))
      .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }


}
