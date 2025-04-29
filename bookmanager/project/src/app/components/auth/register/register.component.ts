import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Register</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name"
              [class.invalid]="showErrors('name')"
            >
            <div class="error-message" *ngIf="showErrors('name')">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              [class.invalid]="showErrors('email')"
            >
            <div class="error-message" *ngIf="showErrors('email')">
              <span *ngIf="registerForm.get('email')?.hasError('required')">
                Email is required
              </span>
              <span *ngIf="registerForm.get('email')?.hasError('email')">
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
              <span *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </span>
              <span *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </span>
            </div>
          </div>

          <div class="error-message" *ngIf="registerError">
            Email already exists
          </div>

          <button type="submit" [disabled]="registerForm.invalid">Register</button>
          
          <p class="auth-link">
            Already have an account? <a routerLink="/login">Login</a>
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
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  registerError = false;

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    
    if (this.authService.register({ 
      email, 
      password, 
      name,
      role: 'reader' // New users are always readers
    })) {
      this.router.navigate(['/login']);
    } else {
      this.registerError = true;
    }
  }

  showErrors(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
}