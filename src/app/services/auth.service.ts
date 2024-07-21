import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://localhost:7220/api';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/Users/login`, { username, password })
            .pipe(
                map(response => {
                    localStorage.setItem('token', response.token);
                    return true;
                }),
                catchError(() => of(false))
            );
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/Users`);
    }

    addUser(user: User): Observable<User> {
        console.log(user)
        return this.http.post<User>(`${this.apiUrl}/Users/create`, user);
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
