import { Component } from '@angular/core';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService }              from './data.service';

import { Order } from './order';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'Check',
  template: `
    <h1>{{title}}</h1>
    <p>選取訂單過濾條件後填寫內容</p>
    <ul class="heroes" *ngFor="let item of items; let i = index">
      <li
      [class.selected]="selectedInputs.indexOf(item)>=0"
      >
        <span class="badge" (click)="onSelect(item)">{{item}}</span>  
        <span *ngIf="selectedInputs.indexOf(item)>=0"><input [(ngModel)]="inputs[i]"/></span>
      </li>
    </ul>

    <div>
      <button (click)="preBook()">查詢</button>
    </div>

    <span *ngFor="let order of checkOrders; let i = index">
      <ul>
        <p>Order {{i+1}}</p>

        <li>order id:{{order.id}}<li>
        <li>movie id:{{order.movie_id}}</li>
        <li>time id :{{order.time_id}}</li>
        <li>seat num:{{order.seat_number}}</li>
        <li>Name  :{{order.name}}</li>
        <li>Phone :{{order.phone}}</li>
        <li>E-mail:{{order.email}}</li>

      </ul>
    </span>
  `,
  styles: [`
    .selected span.badge{
        /*background-color: #CFD8DC !important;*/
        color: white;
        background-color: #607D8B;

    }
    .heroes {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: max-content;
    }


    .heroes .badge {
        display: inline-block;
        background-color: #EEE;

        font-size: small;
        color: black;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: 3em;


        cursor: pointer;

        left: 0;

        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
        
        width: 4em;
        line-height:1.6em;
        text-align:center
    }
    `]
})
export class Check {
  title = 'Check works!';
  items: String[]=["name","phone","e-mail"];
  inputs: String[]=["","",""];
  checkOrders: Order[]=[];

  orders:Order[];


  selectedInputs: Array<String>=new Array<String>();


  constructor(
      private dataService: DataService,
      private route: ActivatedRoute,
      private location: Location,
      private router: Router,
  ) { }
  
  onSelect(item: String){
      let index=this.selectedInputs.indexOf(item);
      if(index>=0){
        this.selectedInputs.splice(index,1);
      }else{
        this.selectedInputs.push(item);
      }
  }

  preBook(): void {
    if(this.selectedInputs.length==0){
      alert("至少要選取一個過濾項目\n(註解下一行程式碼可不進行過濾 即顯示所有訂單)\n(程式碼位置:check.component.ts)");
      return;
    }


    let input_data: String[]=[null,null,null];
    this.items.forEach(item => {
      if(this.selectedInputs.indexOf(item)>=0){
        let index=this.items.indexOf(item);
        input_data[index]=this.inputs[index];
      }
    });
    let checkOrder: Order=new Order(0,0,0);
    checkOrder.name=input_data[0];
    checkOrder.phone=input_data[1];
    checkOrder.email=input_data[2];
    
    this.dataService.storeCheckOrder(checkOrder);
    this.router.navigate(['/check-result']);
  }
}