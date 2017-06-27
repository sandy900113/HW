import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Movie, Time }                    from './movie';
import { DataService }              from './data.service';
import { Order } from './order';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'SeatDetails',
  template: `
    <h1>{{title}}</h1>

    <span *ngIf="loading==true">
      Loading
    </span>
    <span *ngIf="loading==false">
      <div *ngIf="selected">
        <span>電影</span>
        <span>
          <select [(ngModel)]="selected" (ngModelChange)="onChangeMovie()">
            <option [ngValue]="movie" *ngFor="let movie of DataOfMovie">{{movie.title}}</option>
          </select>
        </span>
        
        <p></p>
        <!--
        <span *ngIf="selected">{{selected.title}}</span>
        <p></p> -->

        <span>時間</span>
        <select [(ngModel)]="selectedTime" (ngModelChange)="onChangeTime()">
          <option [ngValue]="time" *ngFor="let time of selected.scheduals">
            {{time.fullTime}}
          </option>
        </select>
      </div>

      <p></p>

      <ul class="heroes" *ngFor="let row of seats">
        <li *ngFor="let one of row"
          [class.selected]="selectedSeats.indexOf(one)>=0"
          [class.bookable]="one.condition=='bookable'"
          [class.disable]="one.condition=='disable'"
          [class.sold]="one.condition=='sold'"
          (click)="onSelectSeat(one)">
            <span class="badge">{{one.id}}</span><span>{{one.condition}}</span>
        </li>
      </ul>

      <div>
        <button (click)="goBack()">回首頁</button>
        <button (click)="preBook()">下一步</button>
      </div>
    </span>

  `,
  styleUrls: ['./app.component.css']
})

export class SeatDetails implements OnInit{
   title = '訂票:選擇電影/時段/座位';
   DataOfMovie : Movie[];
   selected: Movie;
   selectedTime: Time;
   seats: Seat[][]=[];
   disableSeats: number[]=[1,2,3,11,21,8,9,10,20,30,35,36];
   soldSeats: number[]=[3,5,6,21];
   selectedSeats: Array<Seat>=new Array<Seat>();
   preOrders: Order[]=[];

   loading:boolean=true;

   constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) { }

    ngOnInit(): void {
      this.loading=true;
      this.dataService.getMovies().then(hero => {this.DataOfMovie = hero
        this.route.params.switchMap((params: Params) => 
          this.dataService.getMovie(+params['id'])
        ).subscribe(hero =>{
          this.selectedSeats=[];
          this.selected = hero;

          this.route.params.switchMap((params: Params) =>
            Promise.resolve(this.selected.scheduals).then(scheduals => 
              scheduals.find(schedual =>schedual.id==(+params['id2'])))).subscribe(schedual =>{
                this.selectedTime=schedual;
        
              this.dataService.getOrders().then(orders =>{
                this.soldSeats=[];
                orders.forEach(order=>{
                  if(this.selected.id==order.movie_id && this.selectedTime.id==order.time_id){
                    this.soldSeats.push(order.seat_number);
                  }
                })

                this.seats=[];
                for(var i=0;i<4;i++){
                  var temp: Seat[]=[];
                  for(var k=0;k<10;k++){
                    if(this.disableSeats.indexOf((i*10+k+1))>=0)
                      temp.push(new Seat((i*10+k+1),"disable"));
                    else if(this.soldSeats.indexOf((i*10+k+1))>=0)
                      temp.push(new Seat((i*10+k+1),"sold"));
                    else
                      temp.push(new Seat((i*10+k+1),"bookable"));
                  }
                  this.seats.push(temp);
                }
                this.loading=false;
              })
            });
        });
      });
    }    

    getTime(id: number): Time{
      return this.selected.scheduals[id];
    }

    goBack(): void {
        // this.location.back();
        this.router.navigate(['']);
    }
    preBook(): void {
      if(this.selectedSeats.length==0){
        alert("至少要選一個位子 才可進行下一步");
        return;
      }

      this.selectedSeats=this.selectedSeats.sort((a,b)=>{
        if(a.id>b.id)
          return 1;
        else if(a.id<b.id)
          return -1;
        else 
          return 0;
      });
      this.selectedSeats.forEach(seat => {
        this.preOrders.push(new Order(this.selected.id, this.selectedTime.id, seat.id));
      });
      this.dataService.storePreBookOrders(this.preOrders);
      
      this.dataService.storeTryString("Success: Try store string by service");
      this.router.navigate(['/book']);
    }

    onChangeMovie(){
        this.loading=true;
        this.router.navigate(['/seat', this.selected.id, this.selectedTime.id]);
    }

    onChangeTime(){
        this.loading=true;
        this.router.navigate(['/seat', this.selected.id, this.selectedTime.id]);
    }

    onSelectSeat(one: Seat){
      var index=this.selectedSeats.indexOf(one);
      if(index>=0){
        this.selectedSeats.splice(index,1);
      }else{
        this.selectedSeats.push(one);
      }
    }
}

export class Seat{
  id:number;
  condition:String;
  constructor(id:number, condition:String){
    this.id=id;
    this.condition=condition;
  }
}