import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken().token
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.hendleAuthError(error))
    );

  }

  private hendleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.auth.logout();
      this.router.navigate(['/'], {
        queryParams: {
          sessionFailed: true
        }
      });
    }
    return throwError(error);
  }

}
