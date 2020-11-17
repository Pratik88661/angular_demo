import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    templateUrl: 'survey-questions.component.html'
})

export class SurveyQuestionsComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string | undefined;
    questionId:any;
    question:any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService) { 
            console.log(this.route);
            this.questionId = this.route;
            
        }

    ngOnInit() {
        this.loading = true;
        this.userService.findOneQuestions(this.questionId)
            .subscribe(
                (data:any)=> {
                    this.question = data.data.data;
                },
                error => {
                    console.log(error);
                    
                    this.alertService.error(error.error.errors.message);
                    this.loading = false;
                });
    }

   
}
