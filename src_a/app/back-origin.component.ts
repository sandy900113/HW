import { Component } from '@angular/core';

@Component({
  selector: 'BackOrigin',
  template:`
    <a routerLink="" routerLinkActive="active">回到主畫面</a>
    <a routerLink="/check" routerLinkActive="active">回到查詢頁面</a>
    <p></p>
    <p></p>
    `,
  styleUrls: ['./app.component.css']
})
export class BackOrigin {
  title = 'BackOrigin works!';
}
