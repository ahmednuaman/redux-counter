import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons.component';
import { CounterComponent } from './counter.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ButtonsComponent,
    CounterComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
