import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, timer } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { GridService } from '../grid.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [GridService, HttpClientModule]
})
export class GridComponent {
  grid: string[][] = [];
  intervalId: any;
  lastRequestTime: number = 0;
  readonly requestInterval = 1000;  // 1 second for grid refresh
  readonly inputLockDuration = 4000;  // 4 seconds for input lock
  readonly debounceTime = 1500;       // 1.5 seconds debounce time
  form = new FormGroup({
    biasControl: new FormControl('')
  });

  constructor(private gridService: GridService, private codeService: CodeService) {}

  ngOnInit(): void {
    this.initializeGrid();
    this.setupBiasControl();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));
  }

  setupBiasControl(): void {
    this.form.controls.biasControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (value) => {
          value = value ?? ''
          this.form.controls.biasControl.disable();
          // Re-enable input after 4 seconds
          timer(this.inputLockDuration).subscribe(() => {
            this.form.controls.biasControl.enable();
          });
          this.generateCode();
        }, 
        error: (err: any) => {
          console.error('Error fetching grid:', err);
        }
      });
  }

  startGenerator(): void {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - this.lastRequestTime >= this.requestInterval) {
        this.lastRequestTime = currentTime;
        if (!this.form.controls.biasControl.disabled) {
          const bias = this.form.controls.biasControl.value ?? '';
          this.gridService.getGrid(bias).subscribe({
            next: (response: { grid: string[][]; }) => {
              this.grid = response.grid;
              this.generateCode();
            },
            error: (err: any) => console.error('Error fetching grid:', err)
          });
        }
      }
    }, this.requestInterval);
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
      this.codeService.code.next(code);
    }
  }

  getGridCellChar(row: number, col: number): string | null {
    if (row >= 0 && row < 10 && col >= 0 && col < 10) {
      return this.grid[row][col];
    }
    return null;
  }

  countOccurrences(char: string): number {
    return this.grid.flat().filter(cell => cell === char).length;
  }
}
