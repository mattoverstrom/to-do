import { Component, OnInit } from '@angular/core';
import { AuthService } from './common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  loggedIn = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser
      .subscribe((currentUser) => {
        this.loggedIn = this.authService.isAuthenticated();
        this.isAdmin = this.authService.isAdmin();
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
