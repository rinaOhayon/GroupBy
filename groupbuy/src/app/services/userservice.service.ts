import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }
cancel:number=1;
  
    Register(user:User){
      return  this.http.post(environment.api + 'Users/CreateUser',user);
      }
      login(user1:User)
      {
      return this.http.post(environment.api + 'Users/Login',user1);

      }
      RegisterConfirm(iduser:number)
      {
        return this.http.get(environment.api+'Users/CreateUserAfterConfirm/'+iduser);
      }
}
