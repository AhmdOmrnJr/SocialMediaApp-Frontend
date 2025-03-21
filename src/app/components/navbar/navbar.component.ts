import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public darkModeService = inject(DarkModeService)
  private router = inject(Router);
  private toastr = inject(ToastrService);
  userService = inject(UserService);
  user: { firstName: string, token: string } | null = null;

  ngOnInit(): void {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage);
    } else {
      this.user = this.userService.currentUser();
    }
  }

  loggedin = false;
  model: any = {};

  login(): void {
    this.userService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: error => {
        console.log(error)
        this.toastr.error(error.error.message)
      }
    })
  }

  logout() {
    this.userService.logout();
    this.user = null;
    this.router.navigateByUrl('/');
}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
