import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Groups } from 'src/app/models/groups';
import { GroupRegister } from 'src/app/models/group-register';
import { GroupService } from 'src/app/services/group.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent implements OnInit {
Group:Groups;
Manager:GroupRegister;
idGroup:number;
idManager:number;
pay:number=50;
Message:string="";
numregister:number;
showSuccess: boolean;
MailToRegisterGroup:string="";
disable:boolean=false;//משתנה בוליאני בשביל שלא ימחוק לפני שישלח הודעה
  constructor(private activatedRoute:ActivatedRoute,private serviceGroup:GroupService,private router:Router) { }
  public payPalConfig?: IPayPalConfig;
  ngOnInit() {
 
    this.activatedRoute.params.subscribe(p => {
      this.idGroup = p['idGroup'] || '';
      this.idManager=p['idManager']||'';
  this.numregister=p['numRegister']||'';
if(this.idGroup!=null&&this.idManager!=null&&this.numregister!=null)
{


      this.serviceGroup.GetGroupById(this.idGroup).subscribe((data:Groups)=>{
        this.Group=data;
        this.serviceGroup.GetMemberINGroupForUpdate(this.idManager,this.idGroup).subscribe((data:GroupRegister)=>{
          this.Manager=data;
          this.pay=this.pay*this.numregister;
          this.initConfig();
        })
      })
    
      }});
      
}
DeletGroup()
{this.Group.StatusGroup=3;
  
  this.serviceGroup.DeleteGroup(this.Group).subscribe(data=>{
    
Swal.fire({
  position: 'center',
  type: 'success',
  title: 'הקבוצה נמחקה בהצחלה!',
  showConfirmButton: false,
  timer: 5000
}).then((result)=>{
this.router.navigate(['/performance']);
});
       
       this.SendMailToregisterGroup();
      })
}
SendMailToregisterGroup()
{
 this.serviceGroup.SendMailOftheregitergroup(this.idGroup,this.MailToRegisterGroup).subscribe(data=>{
 }); 
}
clickCheckBox()
{
  this.disable=true;
}
private initConfig(): void {
  this.payPalConfig = {
    currency: 'ILS',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'ILS',
            value: this.pay.toString(),
            breakdown: {
              item_total: {
                currency_code: 'ILS',
                value: '9.99'
              }
            }
          }
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
     
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
         //TODO:
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
}
}


