import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }

  registerMode = false;
  userService = inject(UserService);
  users: any = {};


  RegisterModeToggle(){
    this.registerMode = !this.registerMode
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: response => {
        console.log(response);
        this.users = response?.result
      },
      error: error => console.log(error),
    })
  }

  cancelRegister(event: boolean){
    this.registerMode = event
  }
}
