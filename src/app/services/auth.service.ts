import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private adminKey = 'isAdmin';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const isAdmin = localStorage.getItem(this.adminKey);
    return isAdmin === 'true'; // Verifica se o valor armazenado é 'true'
  }

  login(token: string, isAdmin: boolean) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.adminKey, JSON.stringify(isAdmin));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
  }
}
