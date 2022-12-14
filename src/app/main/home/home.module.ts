import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchComponent} from "./search/search.component";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent, SearchComponent, HomeComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
  exports: [
    CarouselComponent, CarouselItemComponent, SearchComponent, HomeComponent
  ]
})
export class HomeModule {
}
