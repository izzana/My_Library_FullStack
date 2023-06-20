import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private baseUrl = 'http://localhost:5000/api/v1/usuario'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl)
  }

  addUser(usuario: Usuario): Observable<any> {
    return this.http.post(this.baseUrl, usuario);
  }

  updateUser(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/atualizar/${usuario.id}`, usuario);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletar/${id}`);
  }

  _getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
