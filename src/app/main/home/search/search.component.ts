import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGenreOptions, getSearchValue, getYearOptions, getOptionValidation } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge, filter, withLatestFrom } from 'rxjs';
import { addOption, removeOption, setSearchValue, typing } from '../+store/actions'
import { Actions, ofType } from '@ngrx/effects';
import { lessThanAsyncValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';

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
  showTooltip = false;

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

  private updateSearchInput(input: HTMLInputElement) {
    this.store.dispatch(setSearchValue({ search: input.value }))
    input.style.width = (input.value.length + 1) + "ch";
  }

  suggestionHandler(option: string, $event: Event, addSuggestion: boolean = false) {
    $event.preventDefault();
    const input = this.searchInput.nativeElement;
    if (!addSuggestion) {
      input.value += ` ${option}:`
    }
    else {
      const type = input.value.split(' ').pop()?.replace(':', '')!
      this.store.dispatch(addOption({ by: type, option: option }));
      input.value = input.value.split(' ').slice(0, -1).join(' ');
    }
    this.updateSearchInput(input)
  }

  ngOnInit(): void {
    const inputElement = this.searchInput.nativeElement
    fromEvent<KeyboardEvent>(inputElement, 'keydown')
      .pipe(
        filter((e) => e.key === 'Enter'),
        withLatestFrom(this.isValid$),
      ).subscribe(([event, { isValid }]) => {
        const value = (event.target as HTMLInputElement).value.split(' ')
        event.preventDefault()

        if (isValid) {
          const [type, chip] = value.pop()!.split(':')
          const search = value.join(' ')
          inputElement.value = search
          this.store.dispatch(addOption({ by: type, option: chip }))
          this.updateSearchInput(inputElement)
        } else {
          this.showTooltip = true;
        }

      })

    // TODO Here we will do request by dispatching with an effect
    fromEvent(inputElement, 'input')
      .pipe(tap(e => {
        this.store.dispatch(typing());
        this.showTooltip = false;
        inputElement.style.width = ((e.target as HTMLInputElement).value.length + 1) + "ch";
      }), debounceTime(200), map(e => (e.target as HTMLInputElement).value))
      .subscribe((v) => this.store.dispatch(setSearchValue({ search: v })))
  }


}
