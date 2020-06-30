import { Component, OnInit, Inject } from '@angular/core';
import { GroupRegister } from 'src/app/models/group-register';
import { GroupService } from 'src/app/services/group.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { GroupView } from 'src/app/models/group-view';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-register',
  templateUrl: './group-register.component.html',
  styleUrls: ['./group-register.component.css']
})
export class GroupRegisterComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  r: GroupRegister = new GroupRegister();
  groupToRegister: GroupView = new GroupView();//הקבוצה אליה רוצה להרשם
  name: string;
  different: number;
  subject: string = "את/ה רוצה להירשם לקבוצה-  ";
  showSuccess: boolean;
  quantityMemberRegister = new FormControl('');
isValid:boolean=false;
  constructor(private groupService: GroupService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GroupRegisterComponent>) {
    //שם הקבוצה אליה רוצה להרשם
    this.subject = this.subject.concat(this.data.group.NameGroup);
  }

  ngOnInit() {
    this.quantityMemberRegister.setValidators(Validators.min(1));
    this.initConfig();
    this.groupToRegister = this.data.group;
    let f: string = " שלום ";
    this.name = f.concat(localStorage.getItem("NameUser"));
    this.name = this.name.concat("!");
    this.r.GetMessage=true;
    this.different = this.groupToRegister.NumMembers - this.groupToRegister.NumMemberRegister;//מספר המקומות שנותרו לרישום
  }

  RegisterGroup() {
    this.r.IdGroup = this.data.group.IdGroup;
    this.r.IdUser = Number(localStorage.getItem("idUser"));
    this.r.DateJoin = new Date();
    this.r.QuantityRegisters=this.quantityMemberRegister.value;
    this.groupService.MemberRegisterCreate(this.r).subscribe(data => {
      Swal.fire({
        type: 'success',
        title: '!הרישום הסתיים בהצלחה',
        showConfirmButton: false,
        timer: 1200,
      }).then(res => this.dialog.closeAll());
    },
      error => {
        Swal.fire({
          type: 'error',
          title: '..אופס',
          text: '<strong>משהו השתבש!</strong>',
          confirmButtonText: 'בסדר',
          html:
            'הרישום נכשל, ' +
            'נסה מאוחר יותר ',
          showCloseButton: true
        }).then(resalve => this.dialog.closeAll());
      });
  }
  cancel() {
    this.dialogRef.close("closeRegister");
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
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'ILS',
                  value: '9.99',
                },
              }
            ]
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
          this.isValid=true;
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

