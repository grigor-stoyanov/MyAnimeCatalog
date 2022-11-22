import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchComponent} from "./search/search.component";


@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent, SearchComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CarouselComponent, CarouselItemComponent, SearchComponent
  ]
})
export class HomeModule {
}
