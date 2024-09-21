import { User } from '@/models/user';
import { SharingDataService } from '@/services/sharing-data.service';
import { UserService } from '@/services/user.service';
import { Component, inject, OnInit} from '@angular/core';
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
  private userService: UserService = inject(UserService);
  private sharingData: SharingDataService = inject(SharingDataService);

  constructor(
    private route: ActivatedRoute
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.userService.findById(id).subscribe(user => this.user = user);
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
