import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Movie, Time }                    from './movie';
import { DataService }              from './data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'MovieDetails',
  template: `
    <h1>{{title}}</h1>
    <ul>
      <li *ngIf="movie">
        <figure>
          <img height=200px src={{movie.img}} />
          <figcaption>{{movie.title}}</figcaption>
        </figure>
      </li>
      <li *ngIf="movie">
        <p>Title:{{movie.title}}</p>
        <p>For:{{movie.whos}}</p>
        <p>Time:</p>
        <ul>
          <p *ngFor="let time of movie.scheduals">
            {{time.month}}/{{time.day}} {{time.hour}}:{{time.minute}}
          </p>
        </ul>
      </li>
    </ul>
  `,
  styleUrls: ['./app.component.css']
})
export class MovieDetails {
  title = 'MovieDetails works!';

   @Input() movie: Movie;

   constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.dataService.getMovie(+params['id']))
            .subscribe(hero => this.movie = hero);
    }    
    goBack(): void {
        this.location.back();
    }
}
