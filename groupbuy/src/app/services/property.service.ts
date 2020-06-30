import { Injectable } from '@angular/core';
import { Property} from '../models/property';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }
  GetPropertyById(id:number):Observable<Property[]>{
    return this.http.get<Property[]>(environment.api +'PropertyOfGroup/GetAllProperty/'+id);
    }
}
