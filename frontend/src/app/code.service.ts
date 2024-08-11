import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CodeService {

  code: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.code.subscribe({
      next(value) {
        console.error(value);
      },
    });
  }
}
