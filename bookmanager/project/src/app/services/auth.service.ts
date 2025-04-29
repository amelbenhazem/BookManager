import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  
  constructor(private router: Router) {
    this.loadUser();
  }

  login(email: string, password: string): boolean {
    // In a real app, this would be an API call
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: Omit<User, 'id'>): boolean {
    const users = this.getUsers();
    if (users.some(u => u.email === user.email)) {
      return false;
    }

    const newUser: User = {
      ...user,
      id: users.length + 1
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  getUser() {
    return this.currentUser;
  }

  private loadUser(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser.set(JSON.parse(userStr));
    }
  }

  private getUsers(): User[] {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      // Initialize with default admin user
      const defaultUsers: User[] = [{
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin'
      }];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(usersStr);
  }
}