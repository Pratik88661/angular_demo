import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { Router } from '@angular/router';
@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    
    model: any = {};
    loading = false;
    questions:any = [];
    url = 'http://localhost:4200/'
    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
           
    }

    ngOnInit() {
         this.loading = true;
            this.userService.fetchAllQuestions()
                .subscribe(
                    (data:any)=> {
                        this.questions = data.data.data;
                    },
                    error => {
                        console.log(error);
                        
                        this.alertService.error(error.error.errors.message);
                        this.loading = false;
                    });
    }
   
    
    
}