import { Component, OnInit, Inject, Optional, Input, ViewChild } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

import { GroupView } from 'src/app/models/group-view';
import { Router } from '@angular/router';
import { RegisterComponent } from '../../../user/register/register.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupRegisterComponent } from '../../registers/group-register/group-register.component';
import { UserserviceService } from 'src/app/services/userservice.service';
import { GroupUpdateRegisterComponent } from '../../registers/group-update-register/group-update-register.component';
import { GroupRegister } from 'src/app/models/group-register';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Groups } from 'src/app/models/groups';
import { Criterion } from 'src/app/models/criterion';
import { zip } from 'rxjs';
import { User } from 'src/app/models/user';
import { PageEvent, MatPaginator } from '@angular/material';
import { BasketService } from 'src/app/services/basket.service';
import { MatPaginatorIntl } from '@angular/material';
import { FunctionGroupService } from 'src/app/services/function-group.service';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'קבוצות לעמוד';
  customPaginatorIntl.nextPageLabel = 'העמוד הבא';
  customPaginatorIntl.previousPageLabel = 'העמוד הקודם';
  customPaginatorIntl.firstPageLabel='העמוד הראשון';
  return customPaginatorIntl;
}
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})

export class GroupComponent implements OnInit {
  //4 משתנים הבאים קשורים לradio
  checked = false;
  indeterminate = false;
  labelPosition = 'createGroup';
  disabled = false;
  AlltheOpenGroups: GroupView[];
  grouView: GroupView[] = [];
  SearchGroups: Groups[];
  AllGroups: Groups[];
  numberOfOpenGroups: number;
  idUserSurfing: number;
  searchListData: GroupView[];
  ParentCategoryChoose: Category;
  SubCategoryChoose: Category;
  searchByName: string = "";
  searchByKod: string = "";
  searchByFreeText: string = "";
  IsReversed: string;
  Group:Groups;
  Manager:GroupRegister;
  public filesExtensions = {

    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.png': 'image/png',
    '.xml': 'application/xml',
    '.doc': 'application/msword',
    '.csv': 'text/csv',
    '.txt': 'text/plain'
  };
  icons = {
    'חברה': 'business',
    'דגם': 'loyalty',
    'מחיר לאחר הנחה': 'local_atm',
    'מנהל המפגש': 'account_circle',
    'גיל יעד': 'people_outline',
    'מיקום': 'place'
  }

  numItemINBasket: any = "אין"
  url: string = null;
  blob: Blob;
  urlShow: any;
  manager: User;
  finish: boolean=false;
  constructor(private servicegroup: GroupService, private categoryService: CategoryserviceService,
    private userService: UserserviceService, private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<Component>
    , private dialogRefGroupRegister: MatDialogRef<GroupUpdateRegisterComponent>,
    public sanitizer: DomSanitizer, private basket: BasketService,private func:FunctionGroupService) {

  }
  colors = {
    'a': 'aqua',
    'b': 'brown',
    'c': 'coral',
    'd': 'darkred',
    'r': 'red',
    'n': 'pink'
  };
  images = {
    '5': 'C0000835.JPG',
    '2': 'MP084.JPG',

  };
  lengthItems: number;
  pageSize: number;

  ngOnInit() {
    this.RefreeshGroups();
    this.servicegroup.GetAllGroupS().subscribe((data: Groups[]) => { this.AllGroups = data });
    this.labelPosition = 'createGroup';
    this.func.moveComponent("GroupView");
  }
  GetFirstLetter(name: string): string {//פונקציה שמחזירה אות ראשונה 
    return name.toUpperCase()[0];
  }
  GetColor(name: string): string {//פונקציה מחזירה צבע ואות של בעל הקבוצה
    return this.func.colors[name[0]] || 'orange';
  }
  GetImage(id: number): string {//פונקציה מחזירה צבע ואות של בעל הקבוצה
    return this.images[id.toString()] || 'SSGP0715.JPG';
  }

  RefreeshGroups() {//פונקציה לרפרוש הקבוצות. נקראת בעת טעינה ולאחר כל שינוי שהתרחש בדף
    this.servicegroup.GetAllGroups(Number(localStorage.getItem("idUser"))).subscribe((data: GroupView[]) => {
      this.numberOfOpenGroups = data.length;
      this.AlltheOpenGroups = data;
      this.searchListData = data;
      this.DataPaginatorList = data;
      this.searchListData.forEach(res => {
        this.blob = this.dataURItoBlob(res.contentImage);
        this.url = window.URL.createObjectURL(this.blob);
        console.log(this.searchListData);
        res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
         res.basket=false;
      });
      this.finish=true;
      this.idUserSurfing = Number(localStorage.getItem("idUser"));
      this.ClickRadio(this.labelPosition);//כשהקבוצות נטענות לפי המיון שבחר
      this.lengthItems = this.AlltheOpenGroups.length;
      this.pageSize = 6;
      this.fillGroups(0);
    }
    )
  }

  //יצירת בלוב 
  dataURItoBlob(dataURI) {
    var binary = atob(dataURI);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.filesExtensions['.png']
    });
  }

  bannerImage: any;
  imgData: any;
  GetDetails(item: GroupView) {//פונקציה זו מקבלת קוד קבוצה ושולחת לדף נפרד את כל הפרטים
    
    localStorage.setItem("img", item.contentImage);
    this.router.navigate(['/details/', item.IdGroup]);
  }

  groupRegister(item: GroupView) {//רישום לקבוצה
    if (!localStorage.getItem("idUser"))//אם עדיין לא נכנסו לאתר
      this.openDialogRegisterWebSite(item);
    else
      this.openDialogRegisterGroup(item);
  }

  //פתיחת דיאלוג רישום אם המשתמש עדיין לא ביצע כניסה / רישום לאתר
  openDialogRegisterWebSite(item) {
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
      debugger;
      if (data == undefined) {//אם הדיאלוג נסגר בגלל שנרשם
      
        //בדיקה האם משתמש זה כבר רשום לקבוצה
        this.servicegroup.ExistsMemberINGroup(Number(localStorage.getItem("idUser")), item.IdGroup).subscribe(data => {
          Swal.fire({
            title: 'הנך רשום לקבוצה זו',
            text: "?האם ברצונך לערוך את פרטי הרישום",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'רישום',
            cancelButtonText: 'ביטול',
            cancelButtonColor: '#ef495c',
            confirmButtonColor: '#7ee3ae',
            showCloseButton: true
          }).then((result) => {
            if (result.value) {//אם רוצה לעדכן יפתח חלון עדכון
              this.UpdateopenDialogGroup(item);
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
              this.dialog.closeAll();
              this.RefreeshGroups();
            }
        }
          , error => {//אם משתתמש זה כבר נרשם לקבוצה יפתח לו חלון של עריכת פרטי הרישום כולל אפשרות מחיקה מקבוצה
            this.openDialogRegisterGroup(item);
            
            });
          });
      }
    });
  }

  openDialogRegisterGroup(item) {//דיאלוג רישום לקבוצה מסוימת
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: 2,
      title: 'Angular For Beginners',
      group: item
    };
    const dialogRef = this.dialog.open(GroupRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        this.RefreeshGroups();
    });
  }
  UpdateopenDialogGroup(item) {//פתיחת דיאלוג עדכון רישום לקבוצה מסוימת
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: 2,
      title: 'Angular For Beginners',
      group: item
    };
    const dialogRefGroupRegister = this.dialog.open(GroupUpdateRegisterComponent, dialogConfig);
    dialogRefGroupRegister.afterClosed().subscribe(result => {
      if (result == undefined)
        this.RefreeshGroups();
    });
  }
  //====================================================הוספתי================
  RemoveFromGroup(item: GroupView) {//מחיקת רישום לקבוצה
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "אתה עומד להסיר את עצמך מקבוצת- " + item.NameGroup,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'ביטול',
      cancelButtonColor: 'grey',
      confirmButtonColor: 'eb3b52',
      showCloseButton: true
    }).then((result) => {

      if (result.value) {
        this.servicegroup.DeleteMemberInGroup(Number(localStorage.getItem("idUser")), item.IdGroup).subscribe(data => {
          if (result.value) {
            Swal.fire(
              '!נמחק',
              'הסרת את עצמך בהצלחה',
              'success'
            ).then(resolve => {
              this.dialog.closeAll();
              this.RefreeshGroups();
            });
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
            this.dialog.closeAll();
          }
        },
          error => {
            Swal.fire({
              type: 'error',
              title: 'אופס..',
              html: '<strong>!משהו השתבש</strong></br>' +
                'המחיקה נכשלה, ' +
                'נסה מאוחר יותר ',
              showCloseButton: true
            }).then(resolve => this.dialog.closeAll());
          });
      }
    }
    );
  }

  // AllRegisterOfGroup(item: GroupView) {//צפיה למנהל הקבוצה בכל האנשים שנרשמו למערכת
  //   debugger;
  //   this.router.navigate(['/group-register-view/', item.IdGroup]);
  // }
  AllRegisterOfGroup(item: GroupView) {//צפיה למנהל הקבוצה בכל האנשים שנרשמו למערכת
    this.router.navigate(['/group-register-view/', item.IdGroup]);

  }
  UpdateGroup(item:GroupView) {
    localStorage.setItem("imgUpdate", item.contentImage);
    this.router.navigate(['/group-update/', item.IdGroup,1]);


  }
  DeleteGroup(item:GroupView){
    
    // הקריאה הזו לצורך עדכון סטטוס הקבוצה יש צורך קודם בהמרה
    this.servicegroup.GetGroupById(item.IdGroup).subscribe((data:Groups)=>{
     this. Group=data;
    
     this. Group.StatusGroup=3;
      //לשאול את רינה איך לעדכן או למחוק את המספר הנרשמים של המנהל
    this.servicegroup.GetMemberINGroupForUpdate(item.IdManager,item.IdGroup).subscribe((data:GroupRegister)=>{
    this.Manager=data;

       //אם אף אחד לא נרשם אז אפשר למחוק את הקבוצה
    if(item.NumMemberRegister==this.Manager.QuantityRegisters){
      
      this.servicegroup.DeleteGroup(this.Group).subscribe(data=>{
        console.log("update");
      })
    }
    else{
       //.פותחים קומפננטה מחיקת קבוצה ושולחים את הקבוצה
       let idGroup=this.Group.IdGroup;
      let idManager=this.Manager.IdUser;
      let numRegister=item.NumMemberRegister;
       
       this.router.navigate(['/group-delete/',idGroup,idManager,numRegister]);
    
      }
    })
    })
  }
  //@Input() paginator:MatPaginator;
  // @ViewChild(MatPaginator) paginator:MatPaginator;//בינתיים לא צריך
  search() {

    //====================================================//
    // this.paginator.pageIndex=0;
    this.searchListData = this.AlltheOpenGroups.filter(p => p.NameGroup.toLowerCase().includes(this.searchByName.toLowerCase()))
    if (this.searchByKod)
      this.searchListData = this.searchListData.filter(p => p.IdGroup == Number(this.searchByKod));
    if (this.ParentCategoryChoose) {
      if (this.ParentCategoryChoose.IdCategory != 1)
        this.searchListData = this.searchListData.filter(p => p.CategorySelected.IdParentCategory == this.ParentCategoryChoose.IdCategory)

    }
    if (this.SubCategoryChoose)
      this.searchListData = this.searchListData.filter(p => p.CategorySelected.IdCategory == this.SubCategoryChoose.IdCategory)
    if (this.searchByFreeText) {
      this.searchFreeText();
    }
    this.fillGroups(0);
  }

  searchParentCategory(event: Category) {
    this.ParentCategoryChoose = event;
    if (this.ParentCategoryChoose.IdCategory == 0) {//אם בחר קטגוריה ריקה
      this.ParentCategoryChoose = null;
      this.SubCategoryChoose = null;
      this.searchListData = this.AlltheOpenGroups;
    }
    this.search();
  }
  searchSubCategory(event: Category) {
    this.SubCategoryChoose = event;
    if (this.SubCategoryChoose.IdCategory == 0)
      this.SubCategoryChoose = null;
    this.search();
  }

  searchName() {
    this.search();
  }
  searchKodGroup() {
    this.search();
  }

  FreeDescription: Groups[];
  CriterionListValue: Criterion[] = [];
  CriterionListKey: Criterion[] = [];
  isFreeText: boolean = false;
  searchFreeText() {

    this.grouView = [];
    this.CriterionListKey = [];
    this.CriterionListValue = [];
    this.FreeDescription = [];
    this.FreeDescription = this.AllGroups.filter(g => g.FreeDescription.toLowerCase().includes(this.searchByFreeText.toLowerCase()));
    for (let j = 0; j < this.AllGroups.length; j++) {
      this.CriterionListValue.push(...this.AllGroups[j].CriterionList.filter(e => e.ValueCriterion.toLowerCase().includes(this.searchByFreeText.toLowerCase())));
      this.CriterionListKey.push(...this.AllGroups[j].CriterionList.filter(e => e.KeyCriterion.toLowerCase().includes(this.searchByFreeText.toLowerCase())));
    }

    // this.CriterionListValue = this.AllGroups.filter(p => p.CriterionList.filter(e => e.ValueCriterion.toLowerCase().includes(this.searchByFreeText.toLowerCase())));
    // this.CriterionListKey = this.AllGroups.filter(p => p.CriterionList.filter(e => e.KeyCriterion.toLowerCase().includes(this.searchByFreeText.toLowerCase())));
    for (let i = 0; i < this.searchListData.length; i++) {
      if (this.FreeDescription.filter(g => g.IdGroup == this.searchListData[i].IdGroup).length > 0) {
        this.grouView.push(this.searchListData[i]);
      }
      else if (this.CriterionListValue.filter(g => g.IdGroup == this.searchListData[i].IdGroup).length > 0) {
        this.grouView.push(this.searchListData[i]);
      }
      else if (this.CriterionListKey.filter(g => g.IdGroup == this.searchListData[i].IdGroup).length > 0) {
        this.grouView.push(this.searchListData[i]);
      }
    }

    //array.sort((a,b) => a.title.rendered.localeCompare(b.title.rendered));
    this.searchListData = this.grouView;

  }
  needClear: boolean = false;
  clear() {
    this.searchListData = this.AlltheOpenGroups;
    this.searchByName = "";
    this.searchByKod = "";
    this.searchByFreeText = "";
    this.needClear = true;
    this.fillGroups(0);
    // this.search();
  }
  ClickRadio(value: string)//פונקציה שנקראת למיון לפי תאריך פתיחה או סגירה או לפי אחוז הנרשמים
  {
    if (value == 'createGroup') {
      this.searchListData = this.searchListData.sort((a, b) => a.DateCreateGroup.localeCompare(b.DateCreateGroup));
      this.labelPosition = 'createGroup';
    }
    else if (value == 'deadlineGroup') {
      this.labelPosition = 'deadlineGroup';
      this.searchListData = this.searchListData.sort(function compare(a, b) {
        var dateA = new Date(a.DeadlineGroup);
        var dateB = new Date(b.DeadlineGroup);
        return dateA.getTime() - dateB.getTime()
      });
    }
    else {
      this.labelPosition = 'PercentMembers';
      this.searchListData = this.searchListData.sort((a, b) => (a.NumMemberRegister / a.NumMembers) - (b.NumMemberRegister / b.NumMembers));
      // searchListDataPercents.forEach(item=> console.log(item.NumMemberRegister / item.NumMembers));
      //   console.log(searchListDataPercents)
    }
    if (this.IsReversed == 'A')//אם רוצה בסדר הפוך
    {
      this.ReverseListGroup(this.IsReversed);
    }
    this.fillGroups(0);
  }

  ReverseListGroup(event: string)//פונקציה שהופכת את הרשימה
  {
    this.IsReversed = event;
    this.searchListData = this.searchListData.reverse();
    this.fillGroups(0);
  }
  //paginator

  //pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  Getdata(event) {
    window.scroll(0,0);
    this.fillGroups(event.pageIndex);
  }
  DataPaginatorList: GroupView[] = [];
  fillGroups(pageIndex) {
    this.DataPaginatorList = this.searchListData.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
    this.lengthItems = this.searchListData.length;
  }
  addToBasket(item) {
   this.basket.GroupBasket.push(item);
    item.basket=false;
    console.log(this.basket.GroupBasket.length);
    this.numItemINBasket = this.basket.GroupBasket.length;
  }
  removeFromBasket(item)
  { item.basket=true;
    this.basket.GroupBasket.splice(item,1);
    this.numItemINBasket=this.basket.GroupBasket.length;
  }
  goToBasket() {
    this.router.navigate(['/basket']);

  }
  changedivImage(event) {
    // document.getElementById("imageOverDiv").children[0].setAttribute('src', event.currentTarget.src);
  }
  openNav() {
    let side = document.getElementById("mySidenav");
    side.style.width = "250px";
    side.style.paddingRight = "3vw";
  }

  closeNav() {
    let side = document.getElementById("mySidenav");
    side.style.width = "0";
    side.style.paddingRight = "0";

  }
}
