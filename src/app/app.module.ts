import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {MainModule} from "./main/main.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./main/home/home/home.component";
import * as $ from 'jquery';
import { appInterceptorPrivider} from "./app.interceptor";
import { ReviewComponent } from './main/review/review/review.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  } , {
    path: 'review',
    loadChildren: () => import('./main/review/review.module').then(m => m.ReviewModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    MainModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  providers: [
    appInterceptorPrivider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
