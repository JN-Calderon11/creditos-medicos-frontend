import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { Card } from '../../../../shared/components/card/card';
import { TextField } from '../../../../shared/components/text-field/text-field';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../notification/pages/alerts/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, Card, TextField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  private readonly authService = inject(AuthService)
  private readonly notification = inject(NotificationService);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    //Nota: Borrar las lineas de comentario para probar el Toast tipo 'sucess' by: Samuel
    /*setTimeout(() => {
      this.submitting.set(false);
      this.notification.success('Bienvenido', 'Sesión iniciada correctamente');
      this.router.navigateByUrl('/home');
    }, 500);
    return;*/

    this.errorMessage.set(null);

    this.authService.login(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (res) => {          
          this.notification.success('Bienvenido', res.message);
          this.router.navigateByUrl('/home');
        },
        error: (err) => this.notification.error(err?.message),
      });
  }
}
