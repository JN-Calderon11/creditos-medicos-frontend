import { Component, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-include',
  templateUrl: './include.html',
  styleUrl: './include.css'
})
export class Include {
  initialIncludes = input<string[]>([]);
  includes = linkedSignal<string[]>(() => [...this.initialIncludes()]);
  includeText = signal('');

  newIncludes = output<string[]>();

  addInclude() {
    const value = this.includeText().trim();
    if (value) {
      this.includes.update(list => [...list, value]);
      this.includeText.set('');
      this.newIncludes.emit(this.includes());
    }
  }

  removeInclude(index: number) {
    this.includes.update(list => list.filter((_, i) => i !== index));
    this.newIncludes.emit(this.includes());
  }
}
