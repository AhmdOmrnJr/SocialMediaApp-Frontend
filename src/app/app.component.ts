import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'socialmediaapp';

  private userService = inject(UserService);

  ngOnInit(): void {
    this.getCurrentUser()
  }
  
  getCurrentUser(){
    const userString = localStorage.getItem('user')
    if (!userString) return;
    const user = JSON.parse(userString);
    this.userService.currentUser.set(user);
  }
}
