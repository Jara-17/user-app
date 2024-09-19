import { IUser } from '@/models/iuser';
import { User } from '@/models/user';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() users: User[] = [];
  @Output() idUserEventEmitter: EventEmitter<string> = new EventEmitter();
  @Output() selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

  onRemove(id: string): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: IUser): void {
    this.selectedUserEventEmitter.emit(user);
  };
}
