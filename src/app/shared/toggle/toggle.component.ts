import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DarkModeService} from "../../services/design/dark-mode.service";
import {map, Observable, scan, share, shareReplay, startWith, take, tap} from "rxjs";
import {LocalService} from "../../services/storage/local-storage.service";

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit, OnChanges {
  mode$: Observable<string> = this.modeService.currentMode$
  checked: boolean | null;
  @Input() label!: Observable<string>;

  constructor(private modeService: DarkModeService, private elementRef: ElementRef, private localService: LocalService) {
    const checked = this.localService.getData('theme')
    this.checked = ((checked == null) ? false : (checked != 'light-mode'))
    let a = 'bitches'
  }

  toggleMode(ev: MouseEvent, changeTo: string) {
    switch (changeTo) {
      case 'dark-mode':
        changeTo = 'light-mode'
        break
      case 'light-mode':
        changeTo = 'dark-mode'
        break
    }
    const event: CustomEvent = new CustomEvent('ToggleMode', {
      bubbles: true,
      detail: {data: changeTo}
    });
    this.elementRef.nativeElement.dispatchEvent(event);
    this.modeService.changeMode(changeTo)
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

}
