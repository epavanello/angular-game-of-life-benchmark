import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Microwave } from '@jscutlery/microwave';
import { animationFrames, Subscription, throttleTime } from 'rxjs';
import { CellModule } from './cell.component';
import { GameOfLife, range } from './game-of-life.service';

@Microwave()
@Component({
  selector: 'jc-game-of-life',
  template: `
    <section
      class="grid"
      [style.gridTemplateColumns]="gridTemplateColumns"
      [style.gridTemplateRows]="gridTemplateRows"
    >
      <ng-container *ngFor="let rowIndex of rows">
        <jc-cell
          *ngFor="let colIndex of cols"
          [col]="colIndex"
          [row]="rowIndex"
        ></jc-cell>
      </ng-container>
    </section>
    counter: {{counter}}
    <button class="button" (click)="reset()">RESET</button>
  `,
  styles: [
    `
      .grid {
        display: grid;
        height: calc(100vh - 100px);
      }

      .button {
        display: block;
        margin: auto;
      }
    `,
  ],
})
export class GameOfLifeComponent implements OnDestroy, OnInit {
  colCount = 200;
  rowCount = 200;
  rows = range(this.rowCount);
  cols = range(this.colCount);
  gridTemplateColumns = `repeat(${this.colCount}, 1fr)`;
  gridTemplateRows = `repeat(${this.rowCount}, 1fr)`;

  counter = 0;

  private _subscription = new Subscription();

  constructor(private _gol: GameOfLife) {}

  async ngOnInit() {
    this.reset();

    const sub = animationFrames().subscribe(() => {
      this._gol.nextGeneration();
      this.counter += 1;
    });

    this._subscription.add(sub);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe;
  }

  reset() {
    this._gol.reset({
      cols: this.colCount,
      rows: this.rowCount,
      percentAlive: 0.2,
    });
  }
}

@NgModule({
  declarations: [GameOfLifeComponent],
  exports: [GameOfLifeComponent],
  imports: [CellModule, CommonModule],
})
export class GameOfLifeModule {}
