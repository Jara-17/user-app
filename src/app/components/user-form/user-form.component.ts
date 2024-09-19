import { User } from '@/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  ngOnInit(): void {
    this.user = {
      id: '',
      name: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    };
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }

    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm) {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
