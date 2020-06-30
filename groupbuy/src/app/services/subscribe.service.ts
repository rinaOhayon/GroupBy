import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscribe } from '../models/subscribe';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
dataSource:any;
  SubscribeCreate(subscribe: Subscribe) {
    return this.http.post(environment.api + 'Subscribe/CreateSubscribe', subscribe);
  }
  GetAllSubscribe(): Observable<Subscribe[]> {
    return this.http.get<Subscribe[]>(environment.api + 'Subscribe/GetAllSubscribe/')
    // .pipe(map((res: Subscribe[]) => {res.forEach(item => item.Deadline = this.datePipe.transform(item.Deadline, 'yyyy-MM-dd')); return res;}));
  }
  GetSubscribe(id: number): Observable<Subscribe> {
    return this.http.get<Subscribe>(environment.api + 'Subscribe/GetSubscribe/' + id);
  }
  DeleteSubscribe(idSubscribe:number): Observable<Subscribe>{
    return this.http.delete<Subscribe>(environment.api+'Subscribe/DeleteSubscribe/'+idSubscribe);
  }
  UpdateSubscribe(subscribe:Subscribe){
    return this.http.put(environment.api+'Subscribe/UpdateSubscribe',subscribe);
  }
  

  
  //DeleteSubscribe()
  //UpdateSubscribe()

}
