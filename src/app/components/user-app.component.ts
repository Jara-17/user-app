import { IUser } from '@/models/interfaces/iuser';
import { UserService } from '@/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { User } from '@/models/user';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '@/services/sharing-data.service';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [
    UserComponent,
    UserFormComponent,
    RouterOutlet,
    NavbarComponent,
    CustomFooterComponent,
  ],
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
      if (user.id > 0) {
        this.userService.update(user).subscribe({
          next: (userUpdated) => {
            this.users = this.users.map((u) =>
              u.id === userUpdated.id ? { ...userUpdated } : u
            );
            this.router.navigate(['/users'], { state: { users: this.users } });
            Swal.fire({
              title: 'Usuario Actualizado!',
              text: 'Usuario actualizado con éxito!',
              icon: 'success',
            });
          },

          error: (err) => {
            if (err.status === 400) {
              console.log(err.status);
              this.sharingDtata.formUserErrorsEventEmitter.emit(err.error);
              Swal.fire({
                title: 'Ha Ocurrido un Error!',
                text: 'Se ha producido un error al actualizar el usuario!',
                icon: 'error',
              });
            }
          },
        });
      } else {
        this.userService.create(user).subscribe({
          next: (userNew) => {
            this.users = [...this.users, { ...userNew }];
            this.router.navigate(['/users'], { state: { users: this.users } });
            Swal.fire({
              title: 'Nuevo Usuario Creado!',
              text: 'Usuario creado con éxito!',
              icon: 'success',
            });
          },
          
          error: (err) => {
            if (err.status === 400) {
              console.log(err.status);
              this.sharingDtata.formUserErrorsEventEmitter.emit(err.error);
              Swal.fire({
                title: 'Ha Ocurrido un Error!',
                text: 'Se ha producido un error al crear el usuario!',
                icon: 'error',
              });
            }
          },
        });
      }

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
          this.userService.remove(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id !== id);
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
          });
        }
      });
    });
  }
}
