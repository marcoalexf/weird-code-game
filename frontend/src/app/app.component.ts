import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { GridService } from './grid.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule],
  providers: [GridService, HttpClientModule]
})
export class AppComponent implements OnDestroy {
  grid: string[][] = [];
  code: string = '';
  intervalId: any;

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.initializeGrid();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));
  }

  startGenerator(): void {
    this.intervalId = setInterval(() => {
      this.gridService.getGrid().subscribe(response => {
        this.grid = response.grid;
        this.generateCode();
      });
    }, 1000);
  }

  stopGenerator(): void {
    // Stop the interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  generateCode(): void {
    const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    this.code = num;
  }
}
