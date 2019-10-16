import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Token} from '../interfaces/token';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = '/api/auth/';
  private token: Token = null;
  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isAuth$.next(this.isAuthenticated());
  }

  public onLogin(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}login`, user)
      .pipe(
        tap(
          (token: Token) => {
            this.setToken(token);
            this.isAuth$.next(true);
          }
        )
      );
  }

  public onRegister(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}register`, user)
      .pipe(
        tap(
          (token: Token) => {
            this.setToken(token);
            this.isAuth$.next(true);
          }
        )
      );
  }

  private setToken(token: Token) {
    window.localStorage.setItem('token', JSON.stringify(token));
  }

  public getToken() {
    return this.token ? this.token : JSON.parse(window.localStorage.getItem('token'));
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.isAuth$.next(false);
    this.router.navigate(['/auth']);
  }

}
