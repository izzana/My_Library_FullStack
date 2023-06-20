import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livros } from 'src/app/models/livros';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private baseUrl = 'http://localhost:5000/api/v1/livros'

  constructor(private http: HttpClient) { }
  getBooks(): Observable<Livros[]> {
    return this.http.get<Livros[]>(this.baseUrl)
  }

  addBook(livro: Livros): Observable<any> {
    return this.http.post(this.baseUrl, livro);
  }

  updateBook(livro: Livros): Observable<any> {
    return this.http.put(`${this.baseUrl}/atualizar/${livro.id}`, livro);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  _getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getBookByAuthor(autor: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/autor/${autor}`);
  }

  getBookByName(titulo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${titulo}`);
  }
}
