import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovielistComponent } from './components/admin/movielist/movielist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MovieCommentComponent } from './components/user/movie-comment/movie-comment.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { ListofmovieComponent } from './components/user/listofmovie/listofmovie.component';

@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    LoginComponent,
    MovieCommentComponent,
    SignupComponent,
    NavComponent,
    ListofmovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
