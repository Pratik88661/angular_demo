import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { QuestionsComponent } from './questions/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {environment } from '../environments/environment';


import {
    SocialLoginModule,
    SocialAuthServiceConfig
  } from "angularx-social-login";
  import {
    GoogleLoginProvider
  } from "angularx-social-login";
  
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        SocialLoginModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        QuestionsComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: "SocialAuthServiceConfig",
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    environment.GOOGLECLIENTID
                  )
                }
              ]
            } as SocialAuthServiceConfig
          },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }