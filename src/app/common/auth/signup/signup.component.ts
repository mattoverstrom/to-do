import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
    templateUrl: './signup.component.html',
})
export class SignupComponent {
    first = '';
    last = '';
    phone = '';
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {}

    signup(): void {
        const user = {
            First: this.first,
            Last: this.last,
            Phone: this.phone,
            Email: this.email,
            Password: this.password,
        };
        this.newMethod(user);
    }

 
    private newMethod(user: { First: string; Last: string; Phone: string; Email: string; Password: string; }) {
        this.signup;
        this.component(user);
    }

 component(user: { First: string; Last: string; Phone: string; Email: string; Password: string; }) {
        this.authService.create(user).subscribe(() => {
            this.router.navigateByUrl('/login');
        });
    }
}
