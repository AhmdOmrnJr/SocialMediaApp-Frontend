import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../models/users.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    private http = inject(HttpClient);
    baseUrl = environment.baseUrl;

    getUsers() {
      return this.http.get<Users | null>(this.baseUrl + 'user');
  }
  getUserByUserName(userName: string) {
      return this.http.get<User | null>(this.baseUrl + `user/${userName}`);
  }
  getUserById(Id: string) {
      return this.http.get<User | null>(this.baseUrl + `user/${Id}`);
  }
}
