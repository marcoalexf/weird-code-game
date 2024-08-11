import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, Observable, timer } from 'rxjs';
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
  grid$!: Observable<string[][]>;
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
    this.form.controls.biasControl.patchValue(this.codeService.bias$.value);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeGrid(): void {
    this.codeService.grid$.next(Array.from({ length: 10 }, () => Array(10).fill(' ')));
    this.grid$ = this.codeService.grid$.asObservable();
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
          this.codeService.bias$.next(value);
          this.codeService.generateCode();
        }, 
        error: (err: any) => {
          console.error('Error fetching grid:', err);
        }
      });
  }

  startGenerator(): void {
    this.codeService.startGenerator(this.lastRequestTime, this.requestInterval, this.form);
  }

  stopGenerator(): void {
    this.codeService.stopGenerator();
  }
}
