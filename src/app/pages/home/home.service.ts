import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://localhost:44345/api/Category';
  private apiUrl1 = 'https://localhost:44345/api/Question';
  categories: string[] = [];
  questions: any[] = [];
  categoryModel: Category;
  constructor(private http: HttpClient) {
    this.categoryModel = new Category();
  }

  addCategory(category: string): Observable<any> {
    const accessToken = localStorage.getItem('authToken'); // Recupera o token do localStorage
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    const categoryModel = { categoryName: category }; // Objeto que será enviado

    return this.http
      .post<any>(`${this.apiUrl}/CreateCategory`, categoryModel, {
        headers,
      })
      .pipe(
        map((response) => {
          console.log(response);
          if (response) {
            console.log('Funciona?');
          }
          return response;
        })
      );
  }

  getAllCategories(): Observable<any> {
    const accessToken = localStorage.getItem('authToken'); // Recuperando o token JWT

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    console.log(accessToken);
    return this.http
      .post<any>(
        `${this.apiUrl}/GetAllCategories`,
        {},
        {
          headers,
        }
      )
      .pipe(
        map((response) => {
          if (response) {
          }
          return response;
        })
      );
  }

  getAllQuestion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl1}/GetAllQuestion`, {}).pipe(
      map((response) => {
        if (response) {
        }
        return response;
      })
    );
  }

  saveQuestion(question: any): Observable<any> {
    const accessToken = localStorage.getItem('authToken'); // Recuperando o token JWT
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.post<any>(`${this.apiUrl1}/CreateQuestion`, question, {
      headers,
    });
  }

  addQuestion(question: any) {
    this.questions.push(question);
  }

  deleteQuestion(id: number): Observable<any> {
    const accessToken = localStorage.getItem('authToken'); // Recupera o token JWT
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.delete<any>(`${this.apiUrl1}/${id}`, { headers });
  }

  updateQuestion(index: number, updatedQuestion: any) {
    this.questions[index] = updatedQuestion;
  }
}
