import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../shared/interfaces/user';
import {Token} from '../../../shared/interfaces/token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public user: User = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public onLogin(user: User = this.user): void {
    this.authService.onLogin(user)
      .subscribe(
        (token: Token) => {
          if (token.user.email) {
            this.router.navigate(['/home'], {
              queryParams: {
                accesDenied: false,
                auth: true,
                message: 'Hello ' + token.user.email
              }
            });
          }
        },
        error => {
          console.log(error);
        });
  }


}
