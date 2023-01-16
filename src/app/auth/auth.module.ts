import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {provideRoutes, RouterModule, Routes} from "@angular/router";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from './profile/profile.component';
import {AnimeResolverResolver} from "../main/anime-resolver.resolver";
import {ProfileResolverResolver} from "./profile-resolver.resolver";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      profile: ProfileResolverResolver
    }
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {
}
