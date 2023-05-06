import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./carousel/carousel.component";
import { CarouselItemComponent } from "./carousel-item/carousel-item.component";
import { SharedModule } from "../../shared/shared.module";
import { SearchComponent } from "./search/search.component";
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { homeFeature } from './+store';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent, SearchComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(homeFeature)
  ],
  exports: [
    CarouselComponent, CarouselItemComponent, SearchComponent, HomeComponent
  ]
})
export class HomeModule {
}
