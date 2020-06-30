import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Subscribe } from 'src/app/models/subscribe';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MAT_DATE_FORMATS } from '@angular/material';
import { CriterionSubscribe } from 'src/app/models/criterion-subscribe';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core'
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Category } from 'src/app/models/category';
import { FormControl, Validators } from '@angular/forms';
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
  selector: 'app-subscribe-update',
  templateUrl: './subscribe-update.component.html',
  styleUrls: ['./subscribe-update.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} },

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
})
export class SubscribeUpdateComponent implements OnInit {
num:Number=12;
  subscribe: Subscribe = new Subscribe();
  yes: boolean = false;
  today=new Date();
  CategoryOFSubscribe: Category;
  cat: string;
  frequency = new FormControl('');
  constructor(private subscribeservice: SubscribeService, @Inject(MAT_DIALOG_DATA) public data: any, private adapter: DateAdapter<any>, private dialog: MatDialog,private categoryService:CategoryserviceService) { }
  idsubscribe: number;
  @ViewChild("selectCat") select;
  //בעת טעינת הדף יבוא הדרישה שרוצים לעדכן
  ngOnInit() {
    this.adapter.setLocale('fr');
    this.frequency.setValidators(Validators.min(0));
    //this.frequency.setValidators(Validators.max(4))
    console.log(this.data);
    this.subscribe= JSON.parse(JSON.stringify(this.data.subscribe));
 
    this.yes = this.subscribe.GetMessage > 0 ? true : false;
    this.subscribe.IdCategory;
    this.categoryService.GetCategoryById(this.subscribe.IdCategory).subscribe((data1: Category) => {//קבלת הקטגוריה שנבחרה
      this.CategoryOFSubscribe = data1;
      this.cat = this.CategoryOFSubscribe.NameCategory;
    });
  }
  UpdateSubscribe() {
console.log(this.subscribe);
this.subscribe.IdCategory=this.CategoryOFSubscribe.IdCategory;
 
    this.subscribeservice.UpdateSubscribe(this.subscribe).subscribe(data => {
      this.dialog.closeAll();
      Swal.fire({
        type: 'success',
        title: 'העדכון בוצע בהצלחה!',
        showConfirmButton: false,
        timer: 1200
      });
      this.dialog.closeAll();
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
        }).then(resalve => this.dialog.closeAll());
      });
  }
  cancel() {
    this.dialog.closeAll();
  }
  categoryChoose(event: Category) {
    this.CategoryOFSubscribe = event;
    this.cat = this.CategoryOFSubscribe.NameCategory||null;
    //  ;
  }
  clickAddCritarion() {

    this.subscribe.CriterionSubscribe.push(new CriterionSubscribe());
  }
  clickRemoveCritarion() {
    let lengthOfSubsribreList = this.subscribe.CriterionSubscribe.length - 1;
    this.subscribe.CriterionSubscribe = this.subscribe.CriterionSubscribe.splice(0, lengthOfSubsribreList);

  }
}
