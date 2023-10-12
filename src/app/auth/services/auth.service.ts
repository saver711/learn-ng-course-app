import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { ErrorResponse } from 'src/app/services.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export type ResponseData = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private timer!: ReturnType<typeof setTimeout> | null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  authorize(
    type: 'signup' | 'login',
    credentials: { email: string; password: string }
  ) {
    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          type === 'login' ? 'signInWithPassword' : 'signUp'
        }?key=AIzaSyAuiLFwhJgzqykZzwOwEyMsM9db1wX_FoM`,
        { ...credentials, returnSecureToken: true }
      )
      .pipe(
        catchError((err: ErrorResponse) => {
          const theError = err.error.error.errors.map((r) => r.message);
          return throwError(() => theError);
        }),
        tap({
          next: (res) => {
            const expDate = new Date(new Date().getTime() + +res.expiresIn);

            const user = new User(res.email, res.localId, res.idToken, expDate);

            this.user.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            this.autoLogout(+res.expiresIn * 1000)
          },
        })
      );
  }

  autoLogin() {
    const loadedUser: {
      email: string;
      id: string;
      _tokenExpirationDate: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('user')!);

    if (!loadedUser) {
      return;
    }

    const user = new User(
      loadedUser.email,
      loadedUser.id,
      loadedUser._token,
      new Date(loadedUser._tokenExpirationDate)
    );

    this.user.next(user);
    // because ام التوقيت الصيفي
    const fakeDate = new Date();
    fakeDate.setHours(fakeDate.getHours() - 1);
    const expiresIn = new Date(loadedUser._tokenExpirationDate).getTime() - fakeDate.getTime()
    this.autoLogout(expiresIn)
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = null;
  }

  autoLogout(timeLeftInMillSec: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, timeLeftInMillSec);
  }
}
