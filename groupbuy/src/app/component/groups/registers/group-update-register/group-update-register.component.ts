import { Component, OnInit, Inject } from '@angular/core';
import { GroupRegister } from 'src/app/models/group-register';
import { GroupService } from 'src/app/services/group.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { GroupView } from 'src/app/models/group-view';
import { group } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-group-update-register',
  templateUrl: './group-update-register.component.html',
  styleUrls: ['./group-update-register.component.css']
})
export class GroupUpdateRegisterComponent implements OnInit {
  group: GroupView = new GroupView();
  r: GroupRegister = new GroupRegister();
  name: string;
  nameGroup: string;
  different:number;
  quantityMember = new FormControl('');

  subject: string = "את/ה רוצה לערוך רישום לקבוצה -  ";
  constructor(private groupService: GroupService, private dialogRef: MatDialogRef<GroupUpdateRegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  
  ngOnInit() {
    this.quantityMember.setValidators(Validators.min(1));
 
    this.group = this.data.group;
    this.nameGroup = this.data.group.NameGroup.toString();
    this.subject = this.subject.concat(this.nameGroup);
    let f: string = " שלום ";
    this.name = f.concat(localStorage.getItem("NameUser"));
    this.name = this.name.concat("!");
    this.different=this.group.NumMembers-this.group.NumMemberRegister;//מספר המקומות שנותרו לרישום

    //קבלת פרטי רישום לקבוצה של אדם 
    this.groupService.GetMemberINGroupForUpdate(Number(localStorage.getItem("idUser")),this.group.IdGroup).subscribe((data: GroupRegister) => {
      this.r = data;
this.different=this.different+this.r.QuantityRegisters;
    });
  }


  UpdateMember() {//עדכון פרטי רישום האדם לקבוצה
    this.groupService.UpdateMemberINGroup(this.r).subscribe(data => {
      Swal.fire({
        type: 'success',
        title: 'העדכון בוצע בהצלחה!',
        showConfirmButton: false,
        timer: 1200
      });
      this.dialogRef.close();
    },
      error => {
        Swal.fire({
          type: 'error',
          title: '..אופס',
          text: "משהו השתבש!",
          html:
            'העדכון נכשל, ' +
            'נסה מאוחר יותר ',
          showCloseButton: true
        }).then(resalve => this.dialogRef.close());
      });
  }

  cancel() {
    //this.dialogRef.close();
  }
}
