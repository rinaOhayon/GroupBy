import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserserviceService } from 'src/app/services/userservice.service';
import { GroupComponent } from '../../groups/groups/group/group.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserserviceService, private dialogref: MatDialogRef<RegisterComponent>) { }
  content: string = null;
  hide = true;
  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  // name= new FormControl('', [Validators.required]);
  errorLogin = false;
  errorLoginContent: string = '';
  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'אתה חייב להכניס ערך' :
      this.email.hasError('email') ? 'מייל לא תקין' :   '';
   }
  // getErrorMessageNameUser() {
  //   return  this.name.hasError('required')?'אתה חייב להכניס ערך':
  //            '';
  // }

  u: User = new User();
  submitregisterForm() {
    this.u.Email = this.email.value;
    this.userService.Register(this.u).subscribe((data: User) => {
      Swal.fire({
        title: 'לסיום הרישום ',
        text: "לחץ על המייל כדי לאשר",
        html:'<a href="http://account.google.com/AddSession">'+
        '<button class="button button-blue button-bordered">לחץ</button>'
          +' </a>',
        type: 'warning',
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
         confirmButtonText: 'OK!'
      })
      this.dialogref.close("Register");
    },
      error => {
        this.errorLogin = true;
        this.errorLoginContent = error.error;
        this.content = error.error;
        alert("error register " + error.error);
      });
  }
  closeDialog()//סגירת הדילוג
  {
  this.dialogref.close("kkk");
  }
}
