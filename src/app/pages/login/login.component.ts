import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializando o formulário de login
    this.loginForm = this.fb.group({
      username: ['Teste11', [Validators.required]], // Campo para o username
      password: ['Daniel1102!', [Validators.required]],
    });
  }

  // Função para enviar o formulário
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.login(loginData).subscribe(async (response) => {
      if (response) {
        console.log(response);
        this.router.navigate(['/home']);
      }
    });
  }
}
