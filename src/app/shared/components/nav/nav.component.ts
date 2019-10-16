import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Token} from '../../interfaces/token';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAuth$ = this.authService.isAuth$;
  }

  onLogOut() {
    this.authService.logout();
  }

}
