import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { User } from 'src/app/models/user';
import { element } from '@angular/core/src/render3/instructions';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {
user:User=new User();
message:string="";
  constructor(private userservice:UserserviceService ,private activatedRoute: ActivatedRoute,private dialog:MatDialog) { }
  tempid: '';
  ngOnInit() {
      this.activatedRoute.params.subscribe(p => {
      this.tempid = p['idUser'] || '';
      this.message="";
      if (this.tempid != '') {
        this.userservice.RegisterConfirm(this.tempid).subscribe((data: User) => {
          this.user=data;
          console.log(this.user);
          if(this.user==null)
          {
            this.message="כבר הינך מאושר אצלינו";
          }
          // else{
          //   this.message="נרשמת בהצלחה";
          // }
          // else{
          // alert("כניסתך אושרה בהצלחה!!!!!!!")}
         },(error:any)=>{
          if(error.status==400)
          {
            if(error.error==40)//Id לא נמצא
            {
              this.message="אינך מופיע באתר";
            }
            else if(error.error==41)
            {
              this.message="כבר אישרת";
            }
          }
         }
        )
        }
           
        
  });

}
Login(item) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.direction = "rtl";
  dialogConfig.data = {
    id: 1,
    title: 'Angular For Beginners'
  };
 this.dialog.open(LoginComponent, dialogConfig);
   
}
}
