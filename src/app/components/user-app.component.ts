import { IUser } from '@/models/iuser';
import { UserService } from '@/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { generateUniqueId } from 'utils';
import { User } from '@/models/user';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '@/services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent, RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private sharingDtata: SharingDataService
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingDtata.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find((user) => user.id === id);
      this.sharingDtata.selectedUserEventEmitter.emit(user);
    });
  }

  addUser(): void {
    this.sharingDtata.newUserEventEmitter.subscribe((user) => {
      if (user.id === 0) {
        this.users = this.users.map((u) =>
          u.id === user.id ? { ...user } : u
        );
      } else {
        this.users = [...this.users, { ...user, id: user.id + 1 }];
      }

      this.router.navigate(['/users'], { state: { users: this.users } });

      Swal.fire({
        title: 'Guardado!',
        text: 'Usuario guardado con éxito!',
        icon: 'success',
      });
    });
  }

  removeUser(): void {
    this.sharingDtata.idUserEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Está seguro que desea eliminar esté usuario?',
        text: 'Una vez eliminado no podra revertirce!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService
            .remove(id)
            .subscribe((updatedUsers) => (this.users = updatedUsers));

          this.router
            .navigate(['/users/create'], { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/users'], {
                state: { users: this.users },
              });
            });

          Swal.fire({
            title: 'Eliminado!',
            text: 'El usuario se ha eliminado correctamente.',
            icon: 'success',
          });
        }
      });
    });
  }
}
