import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, ResponseData } from './services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errors: string[] = [];
  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    this.errors = [];
    this.isLoading = true;

    let autObservable: Observable<ResponseData>;

    if (this.isLoginMode) {
      autObservable = this.authService.authorize('login', authForm.value);
    } else {
      autObservable = this.authService.authorize('signup', authForm.value);
    }

    autObservable.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      error: (err: string[]) => {
        this.errors = err;
        this.isLoading = false;
      },
    });

    authForm.reset();
  }
}
