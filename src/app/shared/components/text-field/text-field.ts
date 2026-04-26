import { Component, Input, Optional, Self, signal } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() autocomplete?: string;
  @Input() id = `text-field-${++nextId}`;

  readonly value = signal('');
  readonly disabled = signal(false);
  readonly touched = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  handleBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  get showError(): boolean {
    const control = this.ngControl?.control;
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty);
  }

  get errorMessage(): string {
    const errors = this.ngControl?.control?.errors as ValidationErrors | null;
    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Ingresa un correo válido';
    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
    return 'Valor inválido';
  }
}
