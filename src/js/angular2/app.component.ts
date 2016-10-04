import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="row">
      <div class="col-xs-8">
        <counter></counter>
      </div>
      <div class="col-xs-4">
        <buttons></buttons>
      </div>
    </div>
  `
})

export class AppComponent { }
