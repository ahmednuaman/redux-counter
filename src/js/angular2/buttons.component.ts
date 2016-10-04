import { Component } from '@angular/core';
import { decrement, increment } from 'reduxstore/action/index';

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
  increment ($event) {
    increment();
  }

  decrement ($event) {
    decrement();
  }
}
