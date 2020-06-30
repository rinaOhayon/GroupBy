import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Category} from '../models/category';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {
  constructor(private http: HttpClient) { }
  
    GetAllParentCategory():Observable<Category[]>{
      return  this.http.get<Category[]>(environment.api + 'Category/GetAllParentCategory');
      }
      GetSubCategoryToAoutoComplete() :Observable<Category[]>{
        return  this.http.get<Category[]>(environment.api +'Category/GetSubCategoryToAoutoComplete');
   }
   GetCategoryById(id) :Observable<Category>{
    return  this.http.get<Category>(environment.api +'Category/GetCategoryById/'+  id);
}
GetSubCategory(idCategory:number){
  return  this.http.get<Category[]>(environment.api +'Category/GetSubCategory/'+idCategory);

}
}
