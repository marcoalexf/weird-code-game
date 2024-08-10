import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule],
})
export class AppComponent implements OnDestroy {
  grid: string[][] = [];
  code: string = '';
  intervalId: any;

  ngOnInit(): void {
    // Initialize the grid with empty strings
    this.initializeGrid();
  }

  ngOnDestroy(): void {
    // Clear interval on component destroy
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));
  }

  startGenerator(): void {
    // Start generating random grid every second
    this.intervalId = setInterval(() => {
      this.fillGrid();
      this.generateCode();
    }, 1000);
  }

  stopGenerator(): void {
    // Stop the interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fillGrid(): void {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.grid[i][j] = this.getRandomChar();
      }
    }
  }

  generateCode(): void {
    const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    this.code = num;
  }

  getRandomChar(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }
}
