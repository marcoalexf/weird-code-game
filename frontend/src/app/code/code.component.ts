import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  @Input() code!: string | null;
  constructor() {}
}
