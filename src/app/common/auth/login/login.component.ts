

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    adminTavernInput = '';
    selected: any;
    showSignup = false;
    isAdmin = false;
    Taverns = [{
        Id:1,
        Name:"Matt's Tavern"
      },
      {
        Id:2,
        Name:"babe Tavern"
      },
      {
       Id:3,
        Name:"Hopes Tavern"
      }];

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        console.log('hello matt');
    }

    ngOnDestroy(): void {
        console.log('with great power comes great responsibility')
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup,
            this.userName = '',
            this.password = '',
            this.isAdmin = false
    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }

    signup(): void {
        const payload = {
            UserName: this.userName,
            Password: this.password,
            tavern: {
                TavernID: this.selected.Id,
                TavernName: this.isAdmin ? this.adminTavernInput : this.selected.Name,
            }
        }
        console.log(payload);

        this.authService.signup(payload).subscribe(
            (user) => {
                this.router.navigateByUrl('/login');
            },
            (error) => {
                console.log(error);
            },
        );
    }

    toggleAdmin(event) {
        if (event.target.checked) {
            this.isAdmin = true;
            this.adminTavernInput = '';
        }
    }

}






















///////----


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { FormControl, Validators, FormGroup } from '@angular/forms';

// @Component({
//     templateUrl: './login.component.html',
// })
// export class LoginComponent implements OnInit, OnDestroy    {
//    {
    // loginForm = new FormGroup({
    //     email: new FormControl('', [Validators.required]),
    //     password: new FormControl('', [Validators.required]),
    // });

    // constructor(private router: Router, private authService: AuthService) {}

    // login(): void {
    //     // logging form
    //     // could instead be checking if the form is valid prior
    //     // to sending the login request
    //     console.log(this.loginForm);

    //     this.authService
            // .login(this.loginForm.value.email, this.loginForm.value.password)
            // .subscribe(
            //     (response) => {
            //         if (response.success) {
            //             console.log('successful login');
            //             this.router.navigateByUrl('/todos');
            //         }
            //     },
            //     (error) => {
            //         console.log('username/password incorrect');
            //     },
            // )
    

