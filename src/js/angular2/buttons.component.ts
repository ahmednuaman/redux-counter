import { Component } from '@angular/core';
let actions = require('reduxstore/action/index');
let decrement = actions.decrement;
let increment = actions.increment;

@Component({
  selector: 'buttons',
  template: `
    <div class="btn-group">
      <button (click)="increment($event)" class="btn btn-default btn-lg">+</button>
      <button (click)="decrement($event)" class="btn btn-default btn-lg">-</button>
    </div>
  `
})

export class ButtonsComponent {
  private decrement = ($event:any) => {
    decrement();
  }

  private increment = ($event:any) => {
    increment();
  }
}
