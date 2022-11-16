import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {CarouselComponent} from './carousel/carousel.component';
import {CarouselItemComponent} from './carousel-item/carousel-item.component';
import {SearchComponent} from './search/search.component';


@NgModule({
  declarations: [
    MainComponent,
    CarouselComponent,
    CarouselItemComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
