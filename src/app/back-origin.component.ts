import { Component } from '@angular/core';

@Component({
  selector: 'BackOrigin',
  template:`
    <p>{{title}}</p>
    <a routerLink="" routerLinkActive="active">回到主畫面</a>
    <p></p>
    <p></p>
    `,
  styleUrls: ['./app.component.css']
})
export class BackOrigin {
  title = 'BackOrigin works!';
}
