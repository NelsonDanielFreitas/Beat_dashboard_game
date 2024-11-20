import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/User';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log('Teste');
  }

  // Método para enviar o formulário
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const user: User = this.registerForm.value;

      this.userService.registerUser(user).subscribe(
        async (response) => {
          //this.router.navigate(['/home']);
        },
        (error) => {
          this.errorMessage = 'Erro ao registrar usuário. Tente novamente!';
          this.isSubmitting = false;
        }
      );
    }
  }

  Logout() {
    this.authService.logout();
  }
}
