import { Component, OnInit } from '@angular/core';
import { BackOrigin } from './back-origin.component';
import { Router } from '@angular/router';
import{ Movie, Time } from './movie';
import { DataService } from './data.service';


@Component({
  selector: 'Main',
  template:`
  <h1>{{title}}</h1>
  <ul>
    <li *ngFor="let movie of DataOfMovie">
      <figure (click)="gotoDetails2(movie)">
          <img height=200px src={{movie.img}} />
          <figcaption>{{movie.title}}</figcaption>
      </figure>
    </li>
    <li>
      <figure (click)="gotoDetails(1)">
          <img height=200px src="assets/img/加勒比海盜 神鬼奇航：死無對證.jpg" />
          <figcaption>加勒比海盜 神鬼奇航：死無對證</figcaption>
      </figure>
    </li>
    <li>
      <figure (click)="gotoDetails(2)">
          <img height=200px src="assets/img/園長夫人：動物園的奇蹟.jpg" />
          <figcaption>園長夫人：動物園的奇蹟</figcaption>
      </figure>
    </li>
  </ul>
  `,
  styleUrls: ['./app.component.css']
})
export class Main {
  title = 'main works!';
  DataOfMovie : Movie[];

  constructor(private router: Router,
              private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getMovies().then(movies => this.DataOfMovie = movies);
  }    
  gotoDetails(index:number){
      this.title="XXX";
      this.router.navigate(['/movie-details']);
  }

  gotoDetails2(movie:Movie){
      this.title="XXX";
      this.router.navigate(['/movie-details', movie.id]);
  }
}
