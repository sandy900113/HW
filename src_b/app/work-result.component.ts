import { Component } from '@angular/core';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService }              from './data.service';

import { Order } from './order';
import { Movie } from './movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'WorkResult',
  template: `
    <h1>{{title}}</h1>

    <span *ngIf="loading==true">
      Loading
    </span>
    <span *ngIf="loading==false">
      <p class="red" *ngIf="success==false">
        選擇的訂位失敗 請重新操作
      </p>
      <p class="red" *ngIf="success==true">
        訂票成功
      </p>
      <p></p>
      <span *ngFor="let order of preOrders; let i = index">
        <ul>
          <p>
            Order {{i+1}}  
            <span *ngIf="success_each[i]==true && success==true">
              (已訂位)
            </span>
            <span *ngIf="success_each[i]==true && success==false">
              (尚可訂位)
            </span>
            <span class="red" *ngIf="success_each[i]==false">
              (已被預訂)
            </span>
          </p>

          <!--
          <li>order id:{{order.id}}<li>
          <li>movie id:{{order.movie_id}}</li>
          <li>time id :{{order.time_id}}</li>
          <li>seat num:{{order.seat_number}}</li>
          -->
          <br><li>order id:{{order.id}}</li>
          <br><li>movie:{{DataOfMovie[order.movie_id-1].title}}</li>
          <br><li>time :{{DataOfMovie[order.movie_id-1].scheduals[order.time_id-1].fullTime}}</li>
          <br><li>seat num:{{order.seat_number}}</li>
          <br><li>Name  :{{order.name}}</li>
          <br><li>Phone :{{order.phone}}</li>
          <br><li>E-mail:{{order.email}}</li>

        </ul>
      </span>

      <span *ngIf="success==false">
        <button (click)="gotoBook()">重新訂票</button>
      </span>
      <span>
        <button (click)="preBook()">回到首頁</button>
      </span>
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
    .red{
      color:red;
    }
  `]
})
export class WorkResult {
  success: boolean=true;
  success_each: Boolean[]=[];
  orders: Order[];
  preOrders: Order[];
  DataOfMovie: Movie[];

  loading:boolean=true;

  
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) { }

  title = 'WorkResult works!';


  ngOnInit(): void {
    this.dataService.getMovies().then(hero => {this.DataOfMovie = hero
      this.dataService.getOrders().then(hero => {this.orders = hero
        this.dataService.getOrders().then(hero => {this.orders = hero
          this.dataService.getPreBookOrders().then(hero => {
            this.preOrders = hero;
            this.preOrders.forEach(preOrder =>{ preOrder.id=-1});

            this.preOrders.forEach(preOrder => {
              let tryFindSold: Order=this.orders.find(order => (
                order.movie_id==preOrder.movie_id && 
                order.time_id==preOrder.time_id && 
                order.seat_number==preOrder.seat_number));
              if(tryFindSold){  //true, has sold
                this.success=false;
                this.success_each.push(new Boolean(false));
              }
              else if(!tryFindSold){  //false
                this.success_each.push(new Boolean(true));
              }
            })
            this.createOrders();
          });
        });
      });
    });
  }

  createOrders(){
    if (this.success==false) { 
      this.loading=false;
      return; 
    }

    this.preOrders.forEach(preOrder =>{
      this.dataService.create(preOrder).then(order => preOrder.id=order.id).then(()=> this.loading=false);
    })
  }

  gotoBook(): void {
    this.router.navigate(['/seat', 1, 1]);
  }
  preBook(): void {
    this.router.navigate(['']);
  }
}
