import { IUser } from '@/models/iuser';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { generateUniqueId } from 'utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: IUser[] = [
    {
      id: generateUniqueId(),
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123',
    },

    {
      id: generateUniqueId(),
      name: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password: 'password123',
    },

    {
      id: generateUniqueId(),
      name: 'Michael',
      lastname: 'Brown',
      email: 'michael.brown@example.com',
      username: 'michaelbrown',
      password: 'password123',
    },

    {
      id: generateUniqueId(),
      name: 'Emily',
      lastname: 'Davis',
      email: 'emily.davis@example.com',
      username: 'emilydavis',
      password: 'password123',
    },

    {
      id: generateUniqueId(),
      name: 'Chris',
      lastname: 'Wilson',
      email: 'chris.wilson@example.com',
      username: 'chriswilson',
      password: 'password123',
    },
  ];

  constructor() {}

  /**
   ** Método para obtener todos los usuarios
   * */
  findAll(): Observable<IUser[]> {
    return of(this.users);
  }

  /**
   ** Método para eliminar un usuario
   * */
  remove(id: string): Observable<IUser[]> {
    this.users = this.users.filter((user) => user.id !== id);
    return of(this.users);
  }
}
