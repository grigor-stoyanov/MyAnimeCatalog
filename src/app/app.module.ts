import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { MainModule } from "./main/main.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { DefaultUrlSerializer, PreloadAllModules, RouterModule, Routes, UrlSerializer } from "@angular/router";
import { HomeComponent } from "./main/home/home/home.component";
import * as $ from 'jquery';
import { appInterceptorPrivider } from "./app.interceptor";
import { ReviewComponent } from './main/review/review/review.component';
import { APP_BASE_HREF } from "@angular/common";
import { Error404Component } from "./core/error404/error404.component";
import { CustomUrlSerializer } from "./url.serializer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { homeFeature } from './main/home/+store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'review',
    loadChildren: () => import('./main/review/review.module').then(m => m.ReviewModule)
  },
  {
    path: '**',
    redirectTo: 'error'
  },
  {
    path: 'error',
    component: Error404Component
  },
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [
    appInterceptorPrivider,
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    DefaultUrlSerializer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
