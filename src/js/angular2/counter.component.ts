import { Component } from '@angular/core';
let store = require('reduxstore/store').default;

@Component({
  selector: 'counter',
  template: `<input [(ngModel)]="count" class="form-control input-lg"/>`
})

export class CounterComponent {
  private count:number = 0;

  constructor () {
    this.subscribe();
  }

  private subscribe = () => {
    store.subscribe(this.handleAction);
  }

  private handleAction = () => {
    const state = store.getState();

    this.count = state.counter;
  }
}
