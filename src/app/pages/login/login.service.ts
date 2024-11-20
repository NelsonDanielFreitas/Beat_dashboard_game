import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://localhost:44345/api/Auth'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  // Função para fazer login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        if (response && response.accessToken) {
          console.log(response.accessToken);
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem(
            'isAdmin',
            JSON.stringify(response.user.isAdmin)
          );
        }

        return response;
      })
    );
  }
}
