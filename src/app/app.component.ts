import { Component, NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameOfLifeModule } from './game-of-life.component';

@Component({
  selector: 'jc-app',
  template: '<jc-game-of-life></jc-game-of-life>',
})
export class AppComponent {}

@NgModule({
  imports: [BrowserModule, GameOfLifeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
