import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService }              from './data.service';

import { Order } from './order';
import { Movie } from './movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'CheckResult',
  template: `
    <h1 style="font-family:Microsoft JhengHei">{{title}}</h1>
    <span *ngIf="loading==true">
      Loading..
    </span>
    <span *ngIf="loading==false">
      <span *ngFor="let order of checkOrders; let i = index">
        <ul>
          <p style="font-weight:bold">Order {{i+1}}</p>

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
      <span *ngIf="checkOrders.length==0" style="font-family:Microsoft JhengHei;font-size:20px">
        查無符合項目的訂單
      </span>

      <div>
        <!--
        <button (click)="goBack()">Back</button>
          -->
        <button (click)="preBook()">回到查詢頁面</button>
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
  `]})
export class CheckResult implements OnInit{
  title = '查詢訂票記錄:填寫篩選條件 -> 查詢結果';
  orders:Order[]=[];
  checkOrders: Order[]=[];
  DataOfMovie: Movie[];

  loading:boolean=true;

  constructor(
      private dataService: DataService,
      private route: ActivatedRoute,
      private location: Location,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataService.getMovies().then(DataOfMovie => {this.DataOfMovie=DataOfMovie
      this.dataService.getOrders().then(orders => {this.orders=orders
        this.dataService.getCheckOrder().then(hero => {
          this.checkOrders=this.check(hero.name, hero.phone, hero.email);
          this.loading=false;
        })
      });
    });
  }    

  check(name: String, phone: String, email: String): Order[]{
    let re: Order[]=[];
    this.orders.forEach(order => {
      if((name==null || name==order.name) && (phone==null || phone==order.phone) && (email==null || email==order.email))
            re.push(order);
    });
    return re;
  }

  goBack(): void {
      this.location.back();
  }
  preBook(): void {
      this.router.navigate(['check']);
  }
}
