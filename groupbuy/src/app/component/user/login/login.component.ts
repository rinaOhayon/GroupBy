import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FunctionGroupService } from 'src/app/services/function-group.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserserviceService, private dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,private func:FunctionGroupService) { }
  u: User = new User();
  hide = true;
  errorLogin = false;
  errorLoginContent: string = '';
  errorCode = 0;
  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'אתה חייב להכניס ערך' :
      this.email.hasError('email') ? 'מייל לא תקין' :
        '';
  }
  submitloginForm() {
    this.u.Email = this.email.value;
    this.userService.login(this.u).subscribe((data: User) => {
      localStorage.setItem("idUser", data.IdUser.toString());
      localStorage.setItem("NameUser", data.NameUser.toString());
      this.func.GetNumNewMessageAfterLogin();
      this.dialogRef.close();
      

    },
      (error:any) => {
        console.log(error);
        this.errorLogin=false;
        if(error.status == 400){
         if(error.error==55)//לא סיים את הרישום
         {this.dialogRef.close("NotConfirm");//לסגור את החלונית של הרישום
          Swal.fire({
            title: 'עדיין לא אמת את הרישום ',
            text: "לחץ על המייל כדי לאשר",
            html:'<a href="http://account.google.com/AddSession">'+
            '<button class="button button-blue button-bordered">לחץ</button>'
              +' </a>',
            type: 'warning',
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
             confirmButtonText: 'OK!'
          })
           console.log("55");
         }
         else if(error.error==56)//המייל והסיסמא לא נכונים
         {
           this.errorLogin=true;
           this.errorLoginContent='המייל או/ו הסיסמא אינם נכונים';
         }
      }
    else{//אם נפל משום מה
      console.log(error.error);
    }
      }
    )
}
}
