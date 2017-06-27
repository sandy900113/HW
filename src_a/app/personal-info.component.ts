import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Movie } from './movie';
import { Order } from './order';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'PersonalInfo',
  template: `
    <h1>{{title}}</h1>
    <span *ngIf="loading==true">
      Loading
    </span>
    <span *ngIf="loading==false">
      <span *ngFor="let order of preOrders; let i = index">
        <ul>
          <p>Order {{i+1}}</p>
          
          <li>order id:{{order.id}}<li>
          <li>movie id:{{order.movie_id}}</li>
          <li>time id :{{order.time_id}}</li>
          <li>seat num:{{order.seat_number}}</li>
          
          <br><li>order id:{{order.id}}</li>
          <br><li>movie:{{DataOfMovie[order.movie_id-1].title}}</li>
          <br><li>time :{{DataOfMovie[order.movie_id-1].scheduals[order.time_id-1].fullTime}}</li>
          <br><li>seat num:{{order.seat_number}}</li>
          <br><li><span>Name:</span><input  styles="border=20px" [(ngModel)]="preOrders[i].name"/></li>
          <br><li><span>Phone:</span><input styles="border=20px" [(ngModel)]="preOrders[i].phone"/></li>
          <br><li><span>E-mail:</span><input styles="border=20px" [(ngModel)]="preOrders[i].email"/></li>
        </ul>
      </span>

      <div>
        <button (click)="goBack()">Back</button>
        <button (click)="preBook()">送出</button>
      </div>
    </span>
  `,
  styles: [`
    li{
          display: inline-block;
          /*font-size: small;*/
          padding:5px;
          line-height: 1em;
          position: relative;
          left: -1px;
          top: -4px;
          /*height: 1.8em;*/       
    }
  `]
})
export class PersonalInfo implements OnInit{
  title: String='訂票:選擇電影/時段/座位 -> 填寫基本資料';
  preOrders: Order[]=[];
  DataOfMovie: Movie[];

  loading:boolean=true;

     constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location, private router: Router){

     }

  ngOnInit(): void {
          this.dataService.getPreBookOrders().then(hero => {this.preOrders = hero
            this.dataService.getMovies().then(hero => {this.DataOfMovie = hero
              this.loading=false;
            });
          });
  }

  goBack(): void {
      this.location.back();
  }
  preBook(): void {
    this.dataService.storePreBookOrders(this.preOrders);
    this.router.navigate(['/book-result']);
  }
}