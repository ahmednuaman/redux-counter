import { Component } from '@angular/core';
import store from 'reduxstore/store';

@Component({
  selector: 'counter',
  template: `<input #count class="form-control input-lg"/>`
})

export class CounterComponent {
  constructor () {
    store.subscribe(() => {
      const state = store.getState();

      count.value = state.counter;
    });
  }
}
