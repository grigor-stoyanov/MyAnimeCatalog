import {Component, ElementRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {DarkModeService} from "./services/design/dark-mode.service";
import {LocalService} from "./services/storage/local-storage.service";

interface IColor {
  light: boolean;
  dark: boolean;
}

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'MyAnimeCatalog';
  themeCondition: IColor = {'light': false, 'dark': false};
  currentTheme: string;

  @HostListener('ToggleMode', ['$event'])
  onToggleModeCaptured(event: any) {
    this.localService.saveData('theme', event.detail.data)
    this.modeService.changeMode(this.currentTheme)
    this.elementRef.nativeElement.className = event.detail.data
  }


  constructor(private modeService: DarkModeService, private elementRef: ElementRef, private localService: LocalService) {
    const theme = this.localService.getData('theme')
    this.currentTheme = (theme) ? theme : 'light-mode'
    this.modeService.changeMode(this.currentTheme)
    elementRef.nativeElement.className = this.currentTheme
  }


}
