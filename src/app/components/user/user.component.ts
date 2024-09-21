import { User } from '@/models/user';
import { SharingDataService } from '@/services/sharing-data.service';
import { UserService } from '@/services/user.service';
import { Component, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  title: string = 'Listado de Usuarios';
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private sharingData: SharingDataService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras.state) {
      this.users = currentNavigation.extras.state['users'] || [];
    } else {
      this.userService.findAll().subscribe((users) => (this.users = users));
    }
  }

  onRemove(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/update', user.id], {state: {user}});
  }
}
