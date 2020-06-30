import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupService } from '../services/group.service';
import { group } from '@angular/animations';
import { Groups } from '../models/groups';
// import { readFile } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class AutoGuardGuard implements CanActivate {
  partUrl: any;
  partUrlId: number;
  partUrlId1: number;
  partUrlComponent: string;
  group: Groups;
  f: boolean;
  constructor(private groupService: GroupService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // var f=this.CheckAccess(state.url);
    this.f = await this.CheckAccess(next.url);
    if (this.f == false)
      this.router.navigate(['/']);
    console.log(this.f);
    return this.f;
  }

  async CheckAccess(url: any) {
    {
      this.partUrlId=Number(url[1].path);
      this.partUrlComponent=url[0].path;

      console.log(this.partUrlId);
      console.log(this.partUrlComponent);
    
      // console.log(url);
      // this.partUrl = url.split('/');
      // this.partUrlId = Number(this.partUrl[this.partUrl.length - 1]);
      // console.log(this.partUrlId);
      // this.partUrlComponent = this.partUrl[this.partUrl.length - 2];
      // console.log(this.partUrlComponent);
      if(this.partUrlComponent==='ChatGroup')
      {
        var data = await <any>this.groupService.GetGroupById(this.partUrlId).toPromise().catch((err) => { return 'error' });
        let user= Number(localStorage.getItem("idUser"));
        if(user!=null)
        var data1 = await <any>this.groupService.ExistsMemberINGroup(user,this.partUrlId).toPromise().catch((err) => { return 'error' });
         
         if(data1=='error')
         {
          return false;
         }
        if(data!='error')
        {
        this.group=data;
          if(this.group.StatusGroup!=0)//לבדוק האם קבוצה באמת סגורה
          return false;
          else
          return true;
        }
      
      }
      if (this.partUrlComponent == 'group-register-view') {
return true;
      }
     
    else  if (this.partUrlComponent == 'group-update') {
   
        var data = await <any>this.groupService.GetGroupById(this.partUrlId).toPromise().catch((err) => { return 'error' });
        if (data != 'error') {
          this.group = data;
          if (this.group.IdManager == Number(localStorage.getItem("idUser"))) {
                    console.log("gjhj");
            return true;
          }

        }

        else {
          return false;
        }

      }

    }
  }
}
