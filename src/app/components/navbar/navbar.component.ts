import { Component, inject } from '@angular/core';
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
export class NavbarComponent {
  public darkModeService = inject(DarkModeService)
  private router = inject(Router);
  private toastr = inject(ToastrService);
  userService = inject(UserService);

  loggedin = false;
  model: any = {};

  login(): void {
    console.log(this.model);
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
    this.router.navigateByUrl('/');
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
