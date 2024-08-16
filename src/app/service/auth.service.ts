// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser';
  private readonly USERS_KEY = 'users';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)!);
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'user';
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  register(username: string, password: string, role: string): boolean {
    const users = this.getUsers();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      return false;
    }

    users.push({ username, password, role });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY)!) || [];
  }
}
