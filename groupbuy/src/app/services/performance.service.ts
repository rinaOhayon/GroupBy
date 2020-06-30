import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformanceUser } from '../models/performance-user';
import { environment } from 'src/environments/environment';
import { GroupView } from '../models/group-view';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private http:HttpClient) { }
  GetPerformance(IdUser):Observable<PerformanceUser>{
    return this.http.get<PerformanceUser>(environment.api+'UserPerformance/GetPerformance/'+IdUser);
  }
  GetAllClosedCreatedGroups(idUser):Observable<GroupView[]>{
    return this.http.get<GroupView[]>(environment.api+'UserPerformance/GetAllClosedCreatedGroups/'+idUser);
  }
  GetNumNewMessage(idUser):Observable<number>{
    return this.http.get<number>(environment.api+'UserPerformance/GetNumNewMessage/'+idUser);
  }
}
