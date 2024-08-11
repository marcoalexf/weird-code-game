import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GridService } from './grid.service';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CodeService {

  code$: BehaviorSubject<string> = new BehaviorSubject('');
  grid$: BehaviorSubject<string[][]> = new BehaviorSubject(new Array<string[]>);
  bias$: BehaviorSubject<string> = new BehaviorSubject('');
  intervalId: any;

  constructor(private gridService: GridService) {
    
  }

  startGenerator(lastRequestTime: number, requestInterval: number, form: FormGroup): void {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastRequestTime >= requestInterval) {
        lastRequestTime = currentTime;
        if (!form.controls['biasControl'].disabled) {
          const bias = this.bias$.value;
          this.gridService.getGrid(bias).subscribe({
            next: (response: { grid: string[][]; }) => {
              this.grid$.next(response.grid);
              this.generateCode();
            },
            error: (err: any) => console.error('Error fetching grid:', err)
          });
        }
      }
    }, requestInterval);
  }

  stopGenerator(): void {
    // Stop the interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  generateCode(): void {
    const now = new Date();
    const seconds = now.getSeconds();
    const row1 = Math.floor(seconds / 10);  // First digit of seconds
    const col1 = seconds % 10;              // Second digit of seconds

    // Get characters from the specified grid cells
    const gridChar1 = this.getGridCellChar(row1, col1);
    const gridChar2 = this.getGridCellChar(col1, row1);

    if (gridChar1 && gridChar2) {
      const countChar1 = this.countOccurrences(gridChar1);
      const countChar2 = this.countOccurrences(gridChar2);

      // Adjust counts to be between 0 and 9
      const adjustedCount1 = countChar1 > 9 ? Math.ceil(countChar1 / Math.max(1, Math.floor(countChar1 / 9))) : countChar1;
      const adjustedCount2 = countChar2 > 9 ? Math.ceil(countChar2 / Math.max(1, Math.floor(countChar2 / 9))) : countChar2;

      // Generate the two-digit code
      const code = `${adjustedCount1}${adjustedCount2}`;
      this.code$.next(code);
    }
  }

  getGridCellChar(row: number, col: number): string | null {
    if (row >= 0 && row < 10 && col >= 0 && col < 10) {
      return this.grid$.value[row][col];
    }
    return null;
  }

  countOccurrences(char: string): number {
    return this.grid$.value.flat().filter(cell => cell === char).length;
  }
}
