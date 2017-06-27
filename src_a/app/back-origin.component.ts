import { Component } from '@angular/core';

@Component({
  selector: 'BackOrigin',
  template:`
    <a routerLink="" routerLinkActive="active" class="Home">回首頁</a>
    <a routerLink="/check" routerLinkActive="active" class="Memory">查詢記錄</a>
    <p></p>
    <p></p>
    `,
  styleUrls: ['./app.component.css']
})
export class BackOrigin {
  title = 'BackOrigin works!';
}
