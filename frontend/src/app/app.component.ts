import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CodeComponent } from "./code/code.component";
import { CodeService } from './code.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, RouterModule, CodeComponent, AsyncPipe, CommonModule],
  providers: [CodeService]
})
export class AppComponent {
  code$: Observable<string>;

  constructor(private codeService: CodeService, private router: Router) {
    this.code$ = this.codeService.code.asObservable();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
