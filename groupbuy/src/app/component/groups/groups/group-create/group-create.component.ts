import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Groups } from 'src/app/models/groups';
import { Property } from 'src/app/models/property';
import { Criterion } from 'src/app/models/criterion';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DATE_FORMATS } from '@angular/material';
import { DateAdapter } from '@angular/material/core';
import { RegisterComponent } from 'src/app/component/user/register/register.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GroupRegister } from 'src/app/models/group-register';
import { IPayPalConfig,ICreateOrderRequest  } from 'ngx-paypal';
import { Router } from '@angular/router';
import { FunctionGroupService } from 'src/app/services/function-group.service';
const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} },

  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
})
export class GroupCreateComponent implements OnInit {
  InstructionsInput = {
    'openCreate':'שלום! צוות GroupBy מגיש לך הוראות מפורטות ליצירת הקבוצה שלך!!! שים לב אליהם!!!!',
    'שם קבוצה': 'עליך לבחור שם לקבוצה',
    'מספר החברים':'הכנס את מספר החברים הדרוש לפתיחת הקבוצה',
    'תאור הקבוצה': 'בחר בתאור שמאפיין את הקבוצה שלך',
    'תאריך לסגירת הקבוצה': 'בחר תאריך אחרון שבו יוכלו להירשם לקבוצה',
    'קטגוריה':'בחר קטגוריה שמאפיינת את הקבוצה שלך',
     'חברה':'רשום את חברת המוצר שלך',
     'דגם':'רשוום את דגם החברה ',
    'מחיר רגיל':'רשום את המחיר של המוצר',
    'מחיר לאחר הנחה':'רשום את מחיר הקבוצה לאחר ההנחה של הקבוצה',
    'תאריך אחרון לסגירת הקבוצה':'התאריך שתזין יהווה תאריך יעד לסגירת הקבוצה,לאחר יצירת הקבוצה לא תוכל לעדכן תאריך זה',
    'מספר הנרשמים שלך':'מספר נרשמים שלך שאתה מכניס לקבוצה',
    'paypal':'אמצעי תשלום לרצינות הקבוצה',
    'img':'בחירת תמונה שמיצגת את רעיון הקבוצה',
    'create':'לאחר שגמרת למלאות את כל הנתונים עכשיו הקבוצה מושלמת ותוכל לצפות עליה',
    'another':''
  };
  groups: Groups[];
  registrGroup: GroupRegister = new GroupRegister();
  idType: number;
  g: Groups = new Groups(1);//שולח רק את סטטוס הקבוצה, סטטוס פתוח שווה 1
  idGroup: number;
  length: number = 0;
  i: number = 0;
  file: any;
  category: Category;
  filesUpload: any[] = [];
  locals: boolean = false;
  today = new Date();
  //paypal
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  isVaild:boolean=false;
  constructor(private groupService: GroupService,private router:Router,private func:FunctionGroupService, private dialog: MatDialog, private adapter: DateAdapter<any>, private _formBuilder: FormBuilder) { }


  quantityMember = new FormControl('');
  quantityRegister = new FormControl('');
  @ViewChild("selectCat") select;

  ngOnInit() {
    this.func.moveComponent("createGroup");
    this.g=new Groups(1);
    this.adapter.setLocale('fr');
    if (localStorage.getItem("idUser")) {//אם עדיין לא נכנסו לאתר
      this.locals = true;
    }
    else {
      this.locals = false;
    }
    this.quantityMember.setValidators(Validators.min(1));
    this.quantityRegister.setValidators(Validators.max(this.g.NumMembersGroup));
    this.isVaild=false;
    
    this.initConfig();
  }

  ngAfterViewInit() {
    setInterval(() => {
      if (this.select.selectText == "") {
        this.g.CriterionList = [];
      }
    }, 1000);
  }
  doResetTOStepper() {//למחיקת הנתונים שהכניס
    this.ngOnInit();
    this.select.selectedCategory = null;
    this.select.selectText = "";
  }
  url :any='';
  onSelectFile(event, file) {
    this.file = file[0];
    this.filesUpload.push(file);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target['result'];
      }
    }
  }
  submitCreateGroup() {
    this.g.IdCategory = this.category.IdCategory;
    this.g.IdManager = Number(localStorage.getItem("idUser"));
    this.g.IdTypeGroup = this.idType;
    this.registrGroup.IdUser = this.g.IdManager;
    this.registrGroup.DateJoin = new Date();
    this.registrGroup.GetMessage = true;
    this.registrGroup.LastSurfingDate=new Date();
    let list: Criterion[] = [];
    for (let i = 0; i < this.g.CriterionList.length; i++) {
      if (this.g.CriterionList[i].KeyCriterion != null &&
        this.g.CriterionList[i].ValueCriterion != null) {
        list.push(this.g.CriterionList[i]);
      }
    }
    this.g.CriterionList = list;
    this.groupService.GroupCreate(this.g, this.file, this.registrGroup).subscribe(data => {
      Swal.fire({
        type: 'success',
        title: 'הקבוצה'+this.g.NameGroup+'נוצרה בצלחה!',
         text: "מיד תקבל הודעה מפורטת במייל",
        imageUrl: '../../../assets/logo-finish.png',
        imageAlt:'logo',
      imageWidth: 260,
      imageHeight: 100,
 
    confirmButtonText:'אישור',
    confirmButtonColor:'#eb3b52',

        //timer: 1200
      }).then((result)=>{
        this.router.navigate(['/group-create']);
      });
    },
      error => {
        alert("error.statusText");
      });
  }
  AddPropety() {
    this.groupService.GetPropertyById(this.idType).subscribe((data: Property[]) => {
      console.log(data);
      this.g.CriterionList = [];
      this.i = 0;
      //המרה למערך של הקריטריונים
      for (let item of data) {
        this.g.CriterionList.push(new Criterion());
        this.g.CriterionList[this.i].KeyCriterion = item.NameProperty;
        this.i++;
      }
      this.length = this.g.CriterionList.length;
    }, error => {
      alert("errorGetAllGroup");
    });
  }
  clickAddCritarion() {
    this.g.CriterionList.push(new Criterion());
  }

  clickRemoveCritarion() {
    if (this.g.CriterionList.length > this.length) {
      let lengthOfSubsribreList = this.g.CriterionList.length - 1;
      this.g.CriterionList = this.g.CriterionList.splice(0, lengthOfSubsribreList);
    }
  }

  categoryChoose(event: Category) {
    console.log(this.select.selectedCategory);
    console.log(this.select.selectText);
    this.idType = event.IdTypeGroup;
    this.category = event;
    this.AddPropety();
  }

  Register() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined) {//אם הדיאלוג נסגר בגלל שנרשם
        this.locals = true;

      }
    });
  }
  focus(step: number, Input: string)//פונקציה שמכניסה הוראה מתאימה בהתאם לאינפוט שעליו
  {
    if (step == 1)

      document.getElementById("focusMessage1").innerHTML ='<h3 style="color:rgb(160, 160, 160)">'+ this.InstructionsInput[Input]+'</h3>';
    else if (step == 2)
      document.getElementById("focusMessage2").innerHTML ='<h3 style="color:rgb(160, 160, 160)">'+ this.InstructionsInput[Input]+'</h3>';
    else
      document.getElementById("focusMessage3").innerHTML = '<h3 style="color:rgb(160, 160, 160)">'+this.InstructionsInput[Input]+'</h3>';

  }
  focusStyle(paypal:string)
  {
    document.getElementById(paypal).style.backgroundColor="rgb(160, 160, 160)";
  }
  mouseLeave(paypal:string)
  {
    document.getElementById(paypal).style.backgroundColor="white";
  }
  //paypal
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
              value: '30',
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
          this.isVaild=true;
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
