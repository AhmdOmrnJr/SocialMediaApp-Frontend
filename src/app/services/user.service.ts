import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    baseUrl = 'https://localhost:7023/api/';
    currentUser = signal<User | null>(null);

    login(model: any) {
        return this.http.post<User>(this.baseUrl + 'user/login', model).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUser.set(user);
                }
                return user
            })
        );
    }
    register(model: any) {
        return this.http.post<User>(this.baseUrl + 'user/register', model).pipe(
            map(res => {
                if (res) {
                    console.log(res);
                }
                return res
            })
        );
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }

    getUsers() {
        return this.http.get<User | null>(this.baseUrl + 'user');
    }
}










// private handleRequest<T>(request: Observable<T>, defaultErrorMessage: string): Observable<T> {
//     return request.pipe(
//         catchError((error: HttpErrorResponse) => {
//             let errorMessage = defaultErrorMessage;

//             if (error.status === 0) {
//                 errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
//             } else if (error.error?.message) {
//                 errorMessage = error.error.message;
//             } else {
//                 errorMessage = `${defaultErrorMessage} (Status: ${error.status})`;
//             }

//             this.errorService.showError(errorMessage);
//             return throwError(() => new Error(errorMessage));
//         })
//     );
// }