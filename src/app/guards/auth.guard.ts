import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const isAdmin = this.authService.isAdmin();
      if (isAdmin) {
        return true;
      } else {
        // Redireciona para página de acesso negado ou outro local
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
