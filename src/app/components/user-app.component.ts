import { IUser } from '@/models/iuser';
import { UserService } from '@/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { generateUniqueId } from 'utils';
import { User } from '@/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de Usuarios';
  users: User[] = [];
  userSelected: User;
  isOpen: boolean = false;

  constructor(private userService: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: IUser): void {
    if (user.id !== '') {
      this.users = this.users.map((u) => (u.id === user.id ? { ...user } : u));
    } else {
      this.users = [...this.users, { ...user, id: generateUniqueId() }];
    }

    Swal.fire({
      title: 'Guardado!',
      text: 'Usuario guardado con éxito!',
      icon: 'success',
    });

    this.userSelected = new User();
    this.setOpen()
  }

  removeUser(id: string): void {
    Swal.fire({
      title: 'Está seguro que desea eliminar esté usuario?',
      text: 'Una vez eliminado no podra revertirce!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .remove(id)
          .subscribe((updatedUsers) => (this.users = updatedUsers));

        Swal.fire({
          title: 'Eliminado!',
          text: 'El usuario se ha eliminado correctamente.',
          icon: 'success',
        });
      }
    });
  }

  setSelectedUser(userRow: IUser): void {
    this.userSelected = { ...userRow };
    this.isOpen = true;
  }

  setOpen() {
    this.isOpen = !this.isOpen;
  }
}
