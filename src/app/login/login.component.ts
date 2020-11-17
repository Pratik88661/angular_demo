import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider,SocialUser  } from "angularx-social-login";

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    user: SocialUser = new SocialUser;
    loading = false;
    returnUrl: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private socialAuthService: SocialAuthService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loading = true;
            this.authenticationService.socialLogin(this.user)
            .subscribe(
                data => {
                    this.loading = false;
                    localStorage.setItem('currentUser', JSON.stringify(data.data));
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            console.log(this.user);
            
          },error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    localStorage.setItem('currentUser', JSON.stringify(data.data));
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error.error.errors.msg);
                    this.loading = false;
                });
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      }
}
