import {Component, ElementRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {DarkModeService} from "./services/dark-mode.service";

interface IColor {
  light: boolean;
  dark: boolean;
}

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent{
  title = 'MyAnimeCatalog';
  themeCondition: IColor = {'light': false, 'dark': false};


  @HostListener('ToggleMode', ['$event'])
  onToggleModeCaptured(event: any) {
    this.elementRef.nativeElement.className = event.detail.data
  }


  constructor(private modeService: DarkModeService,private elementRef: ElementRef) {
    elementRef.nativeElement.className='light-mode'
  }



}
