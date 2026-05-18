import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { Auth } from '../../../../core/services/auth';
import { Card } from '../../../../shared/components/card/card';
import { TextField } from '../../../../shared/components/text-field/text-field';
import { AuthService } from '../../services/auth.service';
import { ToastType } from '../../../../shared/interfaces/toast.interface';
import { ToastService } from '../../../../shared/services/toast.service';
import { Toast } from '../../../../shared/components/toast/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Toast
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);

  readonly showPassword = signal(false);




  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);



  togglePassword(): void {

    this.showPassword.update(value => !value);

  }

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
    this.errorMessage.set(null);

    const { username, password } = this.form.getRawValue();



    if (username === 'jchango' && password === 'jchango1') {
      this.submitting.set(false);


      this.toast.show('Bienvenido changuito', ToastType.Success);

      this.router.navigateByUrl('/home');

    }

    else {

      this.submitting.set(false);


      this.toast.show('Credenciales inválidas', ToastType.Error);


    }







    // this.authService.login({ username, password }).subscribe({

    //   next: (response) => {
    //     this.submitting.set(false);
    //     this.toast.show(response.message, ToastType.Success);
    //     this.router.navigateByUrl('/home');
    //   },

    //   error: (err) => {
    //     this.submitting.set(false);

    //     const message =
    //       err?.error?.message ||
    //       err?.message ||
    //       'Error al iniciar sesión';

    //     this.errorMessage.set(message);
    //   }

    // });

  }

}