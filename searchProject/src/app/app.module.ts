import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {RouterModule, ROUTES} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PostsService} from './posts.service';

const Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },

  {
    path: 'posts', component: PostsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
