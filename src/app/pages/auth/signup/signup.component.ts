import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/interfaces/user';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Token} from '../../../shared/interfaces/token';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: User = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }


  public onRegister(user: User = this.user): void {
    this.authService.onRegister(user)
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
