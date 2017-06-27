import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Movie, Time }                    from './movie';
import { DataService }              from './data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'MovieDetails',
  template: `
    <h1>{{title}}</h1>
    <span *ngIf="loading==true">
      Loading
    </span>
    <span *ngIf="loading==false">
      <ul *ngIf="movie">
        <figure>
          <img height="300px" width="200px" src={{movie.img}}/>
          <figcaption></figcaption>
        </figure>

        <p>Title:</p>
          <ul>
            <h5>{{movie.title}}</h5>
            <h4>{{movie.en_title}}</h4>
          </ul>
        <p>影片資訊:</p>
          <ul>  
            <p *ngFor="let string of movie.details">{{string}}</p>
          </ul>
        <p>Time:</p>
          <ul>
            <p *ngFor="let time of movie.scheduals">
              {{time.fullTime}}
            </p>
          </ul>
      </ul>
      <ul>
        <li>
          <button (click)="goBack()">Back</button>
        </li>
        <li>
          <button (click)="preBook(movie)">Book</button>
        </li>
      </ul>
    </span>

  `,
  styleUrls: ['./app.component.css']
})
export class MovieDetails {
  title = 'MovieDetails works!';

  movie: Movie;

  loading:boolean=true;

   constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.dataService.getMovie(+params['id']))
            .subscribe(hero => {this.movie = hero
              this.loading=false;
            });
    }    
    goBack(): void {
        this.location.back();
    }
    preBook(movie: Movie): void {
        this.router.navigate(['/seat', movie.id, 1]);
    }
}
