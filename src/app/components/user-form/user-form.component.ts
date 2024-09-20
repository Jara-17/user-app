import { User } from '@/models/user';
import { SharingDataService } from '@/services/sharing-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  user: User;

  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.selectedUserEventEmitter.subscribe(
      (user) => (this.user = user)
    );

    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id') || '';

      if (id !== '') {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
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
