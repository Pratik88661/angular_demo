import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    templateUrl: 'questions.component.html'
})

export class QuestionsComponent implements OnInit {
    model: any = {};
   loading = false;
    returnUrl: string | undefined;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
       
    }

    addQuestions() {
        this.loading = true;
        this.userService.createQuestions(this.model)
            .subscribe(
                (data:any)=> {
                    this.alertService.success('Question Added successfully.', true);
                    this.router.navigate(['/view-questions']);
                },
                error => {
                    console.log(error);
                    
                    this.alertService.error(error.error.errors.message);
                    this.loading = false;
                });
    }
}
