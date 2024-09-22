import { User } from '@/models/user';
import { SharingDataService } from '@/services/sharing-data.service';
import { UserService } from '@/services/user.service';
import { Component, inject, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  title: string = 'Listado de Usuarios';
  users: User[] = [];
  private userService: UserService = inject(UserService);
  private sharingData: SharingDataService = inject(SharingDataService);
  private router: Router = inject(Router);

  constructor() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
    if (
      this.users === undefined ||
      this.users === null ||
      this.users.length === 0
    ) {
      console.log('Consulta findAll');
      this.userService.findAll().subscribe((users) => (this.users = users));
    }
  }

  onRemove(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/update', user.id]);
  }
}
