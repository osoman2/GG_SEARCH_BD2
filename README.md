# Base de Datos 2: Proyecto 2 - Motor de búsqueda

Integrantes:
* Mosquera, Raúl
* Nicho, Jorge
* Vilchez, Osman

## Introducción

##  Backend

### Implementación

#### Índice Invertido

#### Manejo de Memoria Secundaria

#### Queries

##  Frontend
Se realizó una página para el motor de búsqueda, en el cual mostramos un pequeño buscador y un visualizador del JSON, que representa los tweets.

![enter image description here](https://raw.githubusercontent.com/THEFLILUX/GG_SEARCH_BD2/main/searchEngine.PNG)

### Integración con NodeJS y Angular

*server.js
```
const express = require('express');
const path = require('path');
const app = express();

const routes = require('./server/routes/posts');

app.use(express.static(path.join(__dirname, 'dist/searchProject')));
app.use('/routes', routes);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/searchProject/index.html'))
});

const port = 4600;

app.listen(port, (req, res)=>{
    console.log(`RUNNING on port ${port}`);
})
```

*posts.js
```
const fs = require('fs');
const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get("/posts", function(req, res){
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.json(data);
})

module.exports = router;
```

*posts.service.ts
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get('/routes/posts/').pipe(map((posts) => {
      return posts;
    }));
  }
}
```

*posts.component.ts
```
import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  posts: any = [];

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
    });
  }

}
```


*app.module.ts
```
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
```

*posts.component.html
```
<div class="container table-div">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">date</th>
          <th scope="col">text</th>
          <th scope="col">user_id</th>
          <th scope="col">user_name</th>
          <th scope="col">location</th>
          <th scope="col">retweeted</th>
          <th scope="col">RT_text</th>
          <th scope="col">RT_user_id</th>
          <th scope="col">RT_user_name</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.date}}</td>
          <td>{{post.text}}</td>
          <td>{{post.user_id}}</td>
          <td>{{post.user_name}}</td>
          <td>{{post.location}}</td>
          <td>{{post.retweeted}}</td>
          <td>{{post.RT_text}}</td>
          <td>{{post.RT_user_id}}</td>
          <td>{{post.RT_user_name}}</td>
        </tr>
      </tbody>
    </table>
</div>
```
