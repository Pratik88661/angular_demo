import { Component } from '@angular/core';
import { User } from './_models/index';
import { UserService } from './_services/index';
@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 
    currentUser: User;
    users: User[] = [];
    model: any = {};
    loading = false;

    constructor(private userService: UserService) {
        const user = localStorage.getItem('currentUser')
        this.currentUser = user !== null ? JSON.parse(user):[];
    }
}