import { User } from '@/models/user';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'custom-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './custom-footer.component.html',
  styleUrl: './custom-footer.component.css',
})
export class CustomFooterComponent {
  @Input() users: User[] = [];
}
