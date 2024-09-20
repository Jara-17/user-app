import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from '@/components/user-app.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserAppComponent],
  template: '<user-app/>',
})
export class AppComponent implements OnInit {
  title = 'user-app';
  
  ngOnInit(): void {
    initFlowbite();
  }
}

