import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'https://localhost:44345/api/Auth'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  // Método para registrar o usuário
  registerUser(user: User): Observable<any> {
    const accessToken = localStorage.getItem('authToken'); // Recupera o token do localStorage
    console.log(accessToken);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http
      .post<any>(`${this.apiUrl}/register`, user, { headers })
      .pipe(
        map((response) => {
          if (response && response.accessToken) {
            // Armazena o novo accessToken, se necessário
            //localStorage.setItem('accessToken', response.accessToken);
            console.log('Funciona?');
          }
          return response;
        })
      );
  }
}
