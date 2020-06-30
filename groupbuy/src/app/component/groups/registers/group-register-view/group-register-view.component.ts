import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { RegisterGroupView } from 'src/app/models/register-group-view';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-register-view',
  templateUrl: './group-register-view.component.html',
  styleUrls: ['./group-register-view.component.css']
})
export class GroupRegisterViewComponent implements OnInit {
  members: RegisterGroupView[] = [];
  numOfMembers:number;
  tempid:number;
  MailToRegisterGroup:string="";
  MailToOneRegisterGroup:string="";
  constructor(private groupService: GroupService, private activatedRoute: ActivatedRoute) { }
 displayedColumns: string[] = ['Index', 'NameUser', 'QuantityRegisters', 'DateJoin','MailUser','GetMessage','sendmail'];
  ngOnInit() {
     ;
    this.activatedRoute.params.subscribe(p => {
      this.tempid = p['id'] || '';
      if (this.tempid !=null) {
        this.groupService.GetAllMemberinGroupForView(this.tempid).subscribe((data: RegisterGroupView[]) => {
          this.members = data;
         this.numOfMembers=this.members.length;
        });
      }
    })
  }
  SendMailToregisterGroup()//שליחת מייל לכל החברים רק מנהל יכול
  { this.MailToRegisterGroup="";
   this.groupService.SendMailOftheregitergroup(this.tempid,this.MailToRegisterGroup).subscribe(data=>{

   }); 
   
  }
  SendMailToOneRegisterGroup(Mail:string)
  {this.MailToOneRegisterGroup="";
    alert("שלחתי מייל ל"+Mail);
  }
}
