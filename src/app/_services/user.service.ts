import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';
import { environment } from '../../environments/environment';
const URL = environment.APIURL;

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(URL+'/api/users');
    }

    getById(id: number) {
        return this.http.get(URL+'/api/users/' + id);
    }

    create(user: User) {
       return this.http.post(URL+'/v1/app/user/signup', user);
    }
    createQuestions(data: any) {
        return this.http.post(URL+'/v1/app/survey/create-survey-questions', data);
    }
    
    fetchAllQuestions(data=[]) {
        return this.http.post(URL+'/v1/app/survey/fetch-all-survey-questions', data);
    }
    findOneQuestions(id:any){
        return this.http.post(URL+'/v1/app/survey/'+id, []);
    }
    update(user: User) {
        return this.http.put(URL+'/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(URL+'/api/users/' + id);
    }
}