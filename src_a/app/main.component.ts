import { Component, OnInit } from '@angular/core';
import { BackOrigin } from './back-origin.component';
import { Router } from '@angular/router';
import { Movie, Time } from './movie';
import { DataService } from './data.service';


@Component({
  selector: 'Main',
  template:`
    <h1>{{title}}</h1>
    <span *ngIf="loading==true">
      Loading
    </span>
    <span *ngIf="loading==false">
      <ul>
        <li *ngFor="let movie of DataOfMovie">
          <figure class="chimga" (click)="gotoDetails2(movie)">
              <img height="330px" width="230px" src={{movie.img}} border=4/> 
          </figure>
          <figcaption>
              <p>{{movie.title}}</p>
              <p style="font-family:New Roman;position:relative;top:-25px;">{{movie.en_title}}</p>
          </figcaption>     
        </li>
      </ul>
    </span>
  `,
  styleUrls: ['./app.component.css']
})
export class Main implements OnInit{
  title = '電影列表';
  DataOfMovie : Movie[];
  
  loading:boolean=true;

  constructor(private router: Router,
              private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getMovies().then(movies => {this.DataOfMovie = movies
      this.loading=false;
    });
  }    

  gotoDetails2(movie:Movie){
      this.router.navigate(['/movie-details', movie.id]);
  }
}
