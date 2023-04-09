import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {SearchComponent} from './home/search/search.component';
import {SharedModule} from "../shared/shared.module";
import {HomeModule} from "./home/home.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MainComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,

        RouterModule
    ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
