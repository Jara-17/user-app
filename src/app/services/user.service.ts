
import { IUser } from '@/models/iuser';
import { User } from '@/models/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';
import { env } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = env.apiUrl;

  constructor() {}

  /**
   ** Método para obtener todos los usuarios
   * */
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  /**
   ** Método para obtener un usuario por su id
   * */
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
   ** Método para crear un usuario
   * */
  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  /**
   ** Método para actualizar un usuario
   * */
  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  /**
   ** Método para eliminar un usuario
   * */
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
