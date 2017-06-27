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
    <h1 style="font-family:Microsoft JhengHei">{{title}}</h1>
    <p style="font-family:Microsoft JhengHei;font-size:20px">選取訂單過濾條件後填寫內容</p>
    <ul class="heroes" *ngFor="let item of items; let i = index">
      <li [class.selected]="selectedInputs.indexOf(item)>=0">
        <span class="badge" (click)="onSelect(item)">{{item}}</span>  
        <span *ngIf="selectedInputs.indexOf(item)>=0"><input [(ngModel)]="inputs[i]"/></span>
      </li>
    </ul>

    <div>
      <button (click)="preBook()">查詢</button>
      <button (click)="preBook2()">顯示所有訂單(測試用途)</button>
    </div>

  `,
  styles: [`
    .selected span.badge{
        /*background-color: #CFD8DC !important;*/
        color: white;
        background-color: #607D8B;
        font-size:20px;
        size:30px
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

        font-size:15px;
        size:25px;
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
  title = '填寫訂票資料做訂單查詢';
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
  preBook2(): void {
    let input_data: String[]=[null,null,null];
    let checkOrder: Order=new Order(0,0,0);
    checkOrder.name=input_data[0];
    checkOrder.phone=input_data[1];
    checkOrder.email=input_data[2];
    
    this.dataService.storeCheckOrder(checkOrder);
    this.router.navigate(['/check-result']);
  }
}