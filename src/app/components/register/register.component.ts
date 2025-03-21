import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};

  userService = inject(UserService);
  toastr = inject(ToastrService)
  cancelRegister = output<boolean>();

  register() {
    console.log(this.model);
    this.userService.register(this.model).subscribe({
      next: response => {
        this.toastr.success(response.result)
        this.cancel()
      },
      error: error => {
        console.log(error)
        this.toastr.error(error)
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
