import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DarkModeService} from "../../services/dark-mode.service";
import {map, Observable, scan, share, shareReplay, startWith, take, tap} from "rxjs";

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() label!: string;
  mode$: Observable<string> = this.modeService.currentMode$


  constructor(private modeService: DarkModeService, private elementRef: ElementRef) {
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

}
