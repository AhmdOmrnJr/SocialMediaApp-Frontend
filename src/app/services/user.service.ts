import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginResponse } from "../models/loginResponse.model";
import { RegisterResponse } from "../models/registerResponse.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    baseUrl = environment.baseUrl;
    currentUser = signal<{ firstName: string, token: string } | null>(null);

    login(model: any) {
        return this.http.post<LoginResponse>(this.baseUrl + 'user/login', model).pipe(
            map(res => {
                if (res) {
                    localStorage.setItem('user', JSON.stringify(res.result));
                    this.currentUser.set(res.result ?? null);
                }
                return res
            })
        );
    }
    register(model: any) {
        return this.http.post<RegisterResponse>(this.baseUrl + 'user/register', model).pipe(
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