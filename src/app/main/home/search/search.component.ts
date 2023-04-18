import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSearchValue } from '../+store/selectors';
import { debounceTime, fromEvent, map, tap, merge } from 'rxjs';
import { setSearchValue, typing } from '../+store/actions'
import { Actions, ofType } from '@ngrx/effects';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  hidden = true;
  destroy = true;
  newSearchValue = ''

  form:FormGroup = this.fb.group({
    // TODO fix search not upating properly
    search:['',Validators.compose([Validators.maxLength(25)])],
    chips:this.fb.array(
      []
      )
  });
  get chips(){
    return this.form.controls['chips'] as FormArray;
  }
  search$ = this.store.select(getSearchValue)
  // TODO Merge streams when loading is compleete to cancel spinner
  isTyping$ = this.action$.pipe(ofType(typing), map(() => true))

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  onInput(event:InputEventInit){
    const value = this.searchInput.nativeElement.innerText.trim().split('\n').pop()
    this.form.get('search')?.setValue(value)
  }

  //TODO update the form control to distinguish between types of parameters
  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault()
      const value = this.searchInput.nativeElement.innerText.trim().split('\n').pop()

      if (value) {
        this.chips.push(this.fb.control(value))
        // this.chips.setValue([...this.chips.value,value]);
        // const [type,chip] = value.split(':')
        // switch(type){
        //   case 'Genre':
        //     genreValue.push(chip)
        //     break
        //   case 'Year':
        //     yearValue.push(chip)
        //     break
        //   default:
        //     return
        // }
      }
    }
  }

  removeChip(chip: string) {
    // Remove data from the form control
    // this.chips = this.chips.filter(c => c != chip);
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
    // this.search$.subscribe(console.log)
    this.form.valueChanges
      .subscribe(console.log)
    // fromEvent(this.searchInput.nativeElement, 'input')
    //   .pipe(tap(e => this.store.dispatch(typing())), debounceTime(500), map(e => (e.target as HTMLInputElement).value))
    //   .subscribe((value) => this.store.dispatch(setSearchValue({ search: value })))
  }


}
