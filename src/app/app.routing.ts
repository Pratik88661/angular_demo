import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { SurveyQuestionsComponent } from './survey-questions/index';
import {QuestionsComponent} from './questions/index'
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'question', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'question/:id', component: SurveyQuestionsComponent, canActivate: [AuthGuard] },
    { path: 'create', component: QuestionsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);