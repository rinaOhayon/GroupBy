import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { CriterionSubscribe } from 'src/app/models/criterion-subscribe';
import { Subscribe } from 'src/app/models/subscribe';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Category } from 'src/app/models/category';
import { MatDialogRef, MAT_DATE_FORMATS, MatDialogConfig, MatDialog } from '@angular/material';
import { DateAdapter } from '@angular/material/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterComponent } from '../../user/register/register.component';
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
  selector: 'app-subscribe-create',
  templateUrl: './subscribe-create.component.html',
  styleUrls: ['./subscribe-create.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} },

  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
})
export class SubscribeCreateComponent implements OnInit {
  today: Date = new Date();
  userForm: any;
  frequency = new FormControl('');
  constructor(private subscribeService: SubscribeService, private dialog: MatDialog, private adapter: DateAdapter<any>, public formBuilder: FormBuilder) { }
  category: Category;
  IsLocalStorage: boolean = false;
  @ViewChild("selectCat") select;
  subscribe: Subscribe = new Subscribe();
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
this.subscribe.GetMessage=0;
    this.frequency.setValidators(Validators.min(0));
    this.frequency.setValidators(Validators.max(50))
    this.adapter.setLocale('fr');

  }

  SumbitCreateNewSubscibe() {
     ;

    this.subscribe.IdCategory = this.category.IdCategory;
    let list: CriterionSubscribe[] = [];
    for (let i = 0; i < this.subscribe.CriterionSubscribe.length; i++) {
      if (this.subscribe.CriterionSubscribe[i].KeyCriterion != null &&
        this.subscribe.CriterionSubscribe[i].ValueCriterion != null) {
        list.push(this.subscribe.CriterionSubscribe[i]);
      }
    }
    this.subscribe.CriterionSubscribe = list;
    this.subscribeService.SubscribeCreate(this.subscribe).subscribe((data: Subscribe) => {

      this.subscribeService.dataSource.push(data);
      this.subscribe = new Subscribe();

      this.close.emit(true);
    }, error => {
      alert("the this.subscribe is not add");
      this.close.emit(true);
      this.subscribe = new Subscribe();
//TODO: לאפס את תיבות הרשימה
    })

  }

  clickAddCritarion() {

    this.subscribe.CriterionSubscribe.push(new CriterionSubscribe());
  }
  clickRemoveCritarion() {
    let lengthOfSubsribreList = this.subscribe.CriterionSubscribe.length - 1;
    this.subscribe.CriterionSubscribe = this.subscribe.CriterionSubscribe.splice(0, lengthOfSubsribreList);

  }
  categoryChoose(event: Category) {
    this.category = event;
  }

  GetNewSubscribe() {
    console.log("subscribe new");
  }


}
