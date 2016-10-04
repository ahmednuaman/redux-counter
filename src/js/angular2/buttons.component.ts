import { Component } from '@angular/core';

@Component({
  selector: 'buttons',
  template: `
    <div class="btn-group">
      <button ng-click="increment($event)" class="btn btn-default btn-lg">+</button>
      <button ng-click="decrement($event)" class="btn btn-default btn-lg">-</button>
    </div>
  `
})

export class ButtonsComponent { }
