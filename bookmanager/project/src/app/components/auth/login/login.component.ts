import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              [class.invalid]="showErrors('email')"
            >
            <div class="error-message" *ngIf="showErrors('email')">
              <span *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </span>
              <span *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              [class.invalid]="showErrors('password')"
            >
            <div class="error-message" *ngIf="showErrors('password')">
              <span *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </span>
            </div>
          </div>

          <div class="error-message" *ngIf="loginError">
            Invalid email or password
          </div>

          <button type="submit" [disabled]="loginForm.invalid">Login</button>
          
          <p class="auth-link">
            Don't have an account? <a routerLink="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
      background-color: #f5f7fa;
    }

    .auth-card {
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #3366CC;
      outline: none;
    }

    input.invalid {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3366CC;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover:not(:disabled) {
      background-color: #2855B0;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .auth-link {
      text-align: center;
      margin-top: 1rem;
    }

    .auth-link a {
      color: #3366CC;
      text-decoration: none;
    }

    .auth-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loginError = false;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    
    if (this.authService.login(email, password)) {
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }

  showErrors(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
}