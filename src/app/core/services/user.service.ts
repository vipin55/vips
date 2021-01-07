import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Login } from '../models/login';

export const TEST_USER = new Login();
TEST_USER.email = 'vips@domain.com';
TEST_USER.password = 'Vips@123';
TEST_USER.date = new Date();
TEST_USER.firstName = 'Vips';
TEST_USER.lastName = 'Domain';

@Injectable()
export class UserService {

    private authenticatedData = false;
    public authenticate(email: string, password: string): Observable<Login> {
        if (email === TEST_USER.email && password === TEST_USER.password) {
            this.authenticatedData = true;
            return of(TEST_USER);
        }
        return throwError(new Error('Invalid email or password'));
    }

    public authenticated(): Observable<boolean> {
        return of(this.authenticatedData);
    }

    public authenticatedUser(): Observable<Login> {
        return of(TEST_USER);
    }

    public signout(): Observable<boolean> {
        this.authenticatedData = false;
        return of(true);
    }
}
