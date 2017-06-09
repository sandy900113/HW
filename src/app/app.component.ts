import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'k-root',
  template:`
    <h1>{{title}}</h1>
    <BackOrigin></BackOrigin>
    <nav>
      <a routerLink="/movie-details" routerLinkActive="active">movie-details</a>
      <a routerLink="/seat" routerLinkActive="active">seat</a>
    </nav>
    <router-outlet></router-outlet>    
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  
  constructor(private router: Router) { 
    this.router.navigate(['']);
  }

  
}
