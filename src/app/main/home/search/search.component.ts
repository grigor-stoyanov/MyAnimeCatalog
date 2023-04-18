import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSearchValue } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge } from 'rxjs';
import { setSearchValue, typing } from '../+store/actions'
import { Actions, ofType } from '@ngrx/effects';
import { NgForm, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Form, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent), multi: true
    }
  ],
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements ControlValueAccessor, AfterViewInit,OnInit {
  // @HostListener('input') callOnChange() {
  //   this._onChange(this.search.nativeElement.textContent);
  // }
  _onChange: any = () => { };
  _onTouched: any = () => { };
  hidden = true;
  destroy = true;
  newSearchValue = ''
  chips: string[] = []
  form!:FormGroup;

  search$ = this.store.select(getSearchValue)
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing), map(() => true))

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault()
      const value = this.searchInput.nativeElement.innerText.trim().split('\n').pop()
      if (value) {
        this.chips = [...this.chips,value]
        this._onChange(this.chips)
      }
    }
  }
  removeChip(chip: string) {
    this.chips = this.chips.filter(c => c != chip);
    this._onChange(this.chips);
  }

  writeValue(chips: string[]): void {
    if (chips) {
      this.chips = chips;
    }

  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn
  }


  constructor(private store: Store, private action$: Actions,private fb:FormBuilder) {

  }

  submitSearch() {
    if (this.form.invalid) {
      return
    }
    return

  }
  ngOnInit(): void {
      this.form = this.fb.group({
        chips:[[]]
      })
  }

  ngAfterViewInit(): void {
    // this.search$.subscribe(console.log)
    // this.form.valueChanges
    //   .subscribe(console.log)
    // fromEvent(this.searchInput.nativeElement, 'input')
    //   .pipe(tap(e => this.store.dispatch(typing())), debounceTime(500), map(e => (e.target as HTMLInputElement).value))
    //   .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }


}
