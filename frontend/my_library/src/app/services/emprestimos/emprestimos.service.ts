import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emprestimos } from 'src/app/models/emprestimos';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  private baseUrl = 'http://localhost:5000/api/v1/emprestimos'

  constructor(private http: HttpClient) { }

  getEmprestimos(): Observable<Emprestimos[]> {
    return this.http.get<Emprestimos[]>(this.baseUrl)
  }

  addEmprestimos(emprestimo: Emprestimos): Observable<any> {
    return this.http.post(this.baseUrl, emprestimo);
  }

  giveBackBook(emprestimo: Emprestimos): Observable<any> {
    return this.http.put(`${this.baseUrl}/devolver/${emprestimo.id}`, emprestimo);
  }
}
