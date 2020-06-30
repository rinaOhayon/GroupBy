import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceService } from 'src/app/services/performance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupView } from 'src/app/models/group-view';
import { Subscribe } from 'src/app/models/subscribe';
import { PerformanceUser } from 'src/app/models/performance-user';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, PageEvent, MatTableDataSource, MatPaginatorIntl, MatPaginator } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { FunctionGroupService } from 'src/app/services/function-group.service';

import { trigger, state, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { GroupService } from 'src/app/services/group.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { SubscribeUpdateComponent } from '../../subscribe/subscribe-update/subscribe-update.component';
import { Groups } from 'src/app/models/groups';
import { GroupRegister } from 'src/app/models/group-register';
import { environment } from 'src/environments/environment';
import { GroupUpdateRegisterComponent } from '../../groups/registers/group-update-register/group-update-register.component';
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'קבוצות לעמוד';
  customPaginatorIntl.nextPageLabel = 'העמוד הבא';
  customPaginatorIntl.previousPageLabel = 'העמוד הקודם';
  customPaginatorIntl.firstPageLabel = 'העמוד הראשון';
  return customPaginatorIntl;
}
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PerformanceComponent implements OnInit {

  constructor(private ServicePerformance: PerformanceService, public subscibeService: SubscribeService, public servicegroup: GroupService, public sanitizer: DomSanitizer, private dialog: MatDialog, private func: FunctionGroupService, private router: Router) { }
  tempid: '';
  idUser: number;
  GroupViewOpen: GroupView[];
  GroupViewRegister: GroupView[];
  Subscribe: Subscribe[];
  pageEventOpenGroup: PageEvent;
  pageSizeOpenGroup: number;
  lengthItemsOpenGroup: number;

  pageEventRegisterGroup: PageEvent;
  pageSizeRegisterGroup: number;
  lengthItemsRegisterGroup: number;

  pageEventSubscribeGroup: PageEvent;
  pageSizeSubscribeGroup: number;
  lengthItemsSubscribeGroup: number;

  DataPaginatorListOpenGroup: GroupView[] = [];
  DataPaginatorListRegisterGroup: GroupView[] = [];

  //subscribe
  columnsToDisplay = ['IdSubscribe', 'NameSubscribe', 'DateCreateSubscribe', 'IdCategory', 'TextFree', 'sd'];
  columnsNames = ['קוד בקשה', 'שם הבקשה', 'תאריך הבקשה', 'קטגוריה', 'תאור'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //
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
  }
  icons = {
    'חברה': 'business',
    'דגם': 'loyalty',
    'מחיר לאחר הנחה': 'local_atm',
    'מנהל המפגש': 'account_circle',
    'גיל יעד': 'people_outline',
    'מיקום': 'place'
  }
  url: string = null;
  blob: Blob;
  urlShow: any;
  locals: boolean = false;
  ngOnInit() {
    this.func.moveComponent("performance");
    if (localStorage.getItem("idUser")) {//אם עדיין לא נכנסו לאתר
      this.idUser = Number(localStorage.getItem("idUser"));
      this.RefreshPerformance();
    }
    else {
      this.locals = false;
    }
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.filesExtensions['.jpg']
    });
  }
  GetColor(name: string): string {//פונקציה מחזירה צבע ואות של בעל הקבוצה
    return this.func.colors[name[0]] || 'orange';
  }
  RefreshPerformance() {
    this.locals = true;

    this.ServicePerformance.GetPerformance(Number(localStorage.getItem("idUser"))).subscribe((data: PerformanceUser) => {
      if (data.GroupViewOpen.length > 0) {
        this.GroupViewOpen = [];
        this.GroupViewOpen = data.GroupViewOpen;
        this.GroupViewOpen.forEach(res => {
          this.blob = this.dataURItoBlob(res.contentImage);
          this.url = window.URL.createObjectURL(this.blob);
          res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          res['basket'] = false;

        });
        this.func.CheckBasket(this.GroupViewOpen);
        this.lengthItemsOpenGroup = this.GroupViewOpen.length;
        this.pageSizeOpenGroup = 3;
        this.fillOpenGroups(0);
      }
      ;
      if (data.GroupViewRegister.length > 0) {
        this.GroupViewRegister = [];
        this.GroupViewRegister = data.GroupViewRegister;
        this.GroupViewRegister.forEach(res => {
          this.blob = this.dataURItoBlob(res.contentImage);
          this.url = window.URL.createObjectURL(this.blob);
          res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          res.basket = false;
        });
        this.func.CheckBasket(this.GroupViewRegister);
        this.lengthItemsRegisterGroup = this.GroupViewRegister.length;
        this.pageSizeRegisterGroup = 3;
        this.fillRegisterGroup(0);
      }
      if (data.Subscribe.length > 0) {

        // this.subscibeService.dataSource = new MatTableDataSource<Subscribe>(this.searchSubscribeList);
        this.Subscribe = [];
        this.Subscribe = data.Subscribe;
        this.dataSource = new MatTableDataSource<Subscribe>(this.Subscribe);
        this.dataSource.paginator = this.paginator;

      }
    });
  }
  RefreshGroupOpen() {
    this.ServicePerformance.GetPerformance(Number(localStorage.getItem("idUser"))).subscribe((data: PerformanceUser) => {
      if (data.GroupViewOpen.length > 0) {
        this.GroupViewOpen = [];
        this.GroupViewOpen = data.GroupViewOpen;
        this.GroupViewOpen.forEach(res => {
          this.blob = this.dataURItoBlob(res.contentImage);
          this.url = window.URL.createObjectURL(this.blob);
          res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          res['basket'] = false;

        });
        this.func.CheckBasket(this.GroupViewOpen);
        this.lengthItemsOpenGroup = this.GroupViewOpen.length;
        this.pageSizeOpenGroup = 3;
        this.fillOpenGroups(0);
      }
    });

  }
  
  RefreshGroupRegister() {
    this.ServicePerformance.GetPerformance(Number(localStorage.getItem("idUser"))).subscribe((data: PerformanceUser) => {

      if (data.GroupViewRegister.length > 0) {
        this.GroupViewRegister = [];
        this.GroupViewRegister = data.GroupViewRegister;
        this.GroupViewRegister.forEach(res => {
          this.blob = this.dataURItoBlob(res.contentImage);
          this.url = window.URL.createObjectURL(this.blob);
          res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          res.basket = false;
        });
        this.func.CheckBasket(this.GroupViewRegister);
        this.lengthItemsRegisterGroup = this.GroupViewRegister.length;
        this.pageSizeRegisterGroup = 3;
        this.fillRegisterGroup(0);
      }
    });
  }
  RefreshSubscribe() {
    this.ServicePerformance.GetPerformance(Number(localStorage.getItem("idUser"))).subscribe((data: PerformanceUser) => {
      if (data.Subscribe.length > 0) {

        // this.subscibeService.dataSource = new MatTableDataSource<Subscribe>(this.searchSubscribeList);
        this.Subscribe = [];
        this.Subscribe = data.Subscribe;
        this.dataSource = new MatTableDataSource<Subscribe>(this.Subscribe);
        this.dataSource.paginator = this.paginator;

      }
    });    
  }
  Register(item) {
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
        this.RefreshPerformance();
      }
    });
  }
  GetdataOpenGroups(event) {
    this.fillOpenGroups(event.pageIndex);
  }
  fillOpenGroups(pageIndex: number) {
    this.DataPaginatorListOpenGroup = this.GroupViewOpen.slice(pageIndex * this.pageSizeOpenGroup, (pageIndex + 1) * this.pageSizeOpenGroup);
    this.lengthItemsOpenGroup = this.GroupViewOpen.length;
    console.log(this.DataPaginatorListOpenGroup);
    console.log(this.lengthItemsOpenGroup);
  }
  GetdataRegisterGroup(event) {
    this.fillRegisterGroup(event.pageIndex);
    window.scroll(0, 0);

  }
  fillRegisterGroup(pageIndex: number) {

    this.DataPaginatorListRegisterGroup = this.GroupViewRegister.slice(pageIndex * this.pageSizeRegisterGroup, (pageIndex + 1) * this.pageSizeRegisterGroup);
    this.lengthItemsRegisterGroup = this.GroupViewRegister.length;
  }
  CreatGrouop() {//מעבר לקומפננטה של יצירת קבוצה
    this.router.navigate(['/group-create']);
  }
  RegisterGroup() {//מעבר לקומפננטה של צפיה בקבוצות

  }
  CreateSubscribe() {//מעבר לקומפננטה של יצירת בקשה

  }
  GetDetails(item: GroupView)//מעבר לקומפוננטה של פרטים
  {
    localStorage.setItem("img", item.contentImage);
    this.router.navigate(['/details/', item.IdGroup]);
  }
  RemoveFromGroup(item: GroupView) {//מחיקת רישום לקבוצה
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "אתה עומד להסיר את עצמך מקבוצת- " + item.NameGroup,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'ביטול',
      cancelButtonColor: 'grey',
      confirmButtonColor: '#ef495c',
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
              this.RefreshGroupRegister();
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
  DeleteSubscibe(idsubscribe: number) {//מחיקת בקשה
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "אתה רוצה למחוק את בקשה מס "+idsubscribe,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: environment.colorpink,
      cancelButtonColor: 'grey',
      confirmButtonText: 'כן, מחק!!',
      cancelButtonText:'ביטול'
    }).then((result) => {
      if (result.value) {

        this.subscibeService.DeleteSubscribe(idsubscribe).subscribe(data => {
          Swal.fire(
           'נמחק!',
            'הבקשה שלך נמחקה',
            'success'
          ).then((result) => { this.RefreshSubscribe() }

          )
        },
          error => {
            Swal.fire(
              'נכשל!',
              '',
              'error'
            )
          });

      }
    })
  }
  
  Group: Groups;
  Manager: GroupRegister;
  DeleteGroup(item: GroupView) {//מחיקת קבוצה

    // הקריאה הזו לצורך עדכון סטטוס הקבוצה יש צורך קודם בהמרה
    this.servicegroup.GetGroupById(item.IdGroup).subscribe((data: Groups) => {
      this.Group = data;

      this.Group.StatusGroup = 3;
      //לשאול את רינה איך לעדכן או למחוק את המספר הנרשמים של המנהל
      this.servicegroup.GetMemberINGroupForUpdate(item.IdManager, item.IdGroup).subscribe((data: GroupRegister) => {
        this.Manager = data;

        //אם אף אחד לא נרשם אז אפשר למחוק את הקבוצה
        if (item.NumMemberRegister == this.Manager.QuantityRegisters) {

          this.servicegroup.DeleteGroup(this.Group).subscribe(data => {
            console.log("update");
          })
        }
        else {
          //.פותחים קומפננטה מחיקת קבוצה ושולחים את הקבוצה
          let idGroup = this.Group.IdGroup;
          let idManager = this.Manager.IdUser;
          let numRegister = item.NumMemberRegister;

          this.router.navigate(['/group-delete/', idGroup, idManager, numRegister]);

        }
      })
    })
  }
  AllRegisterOfGroup(item: GroupView) {//צפיה למנהל הקבוצה בכל האנשים שנרשמו למערכת
    this.router.navigate(['/group-register-view/', item.IdGroup]);

  }
  UpdateSubscribe(item: Subscribe) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: 5,
      title: 'Angular For Beginners',
      subscribe: item
    };
    const dialogRef = this.dialog.open(SubscribeUpdateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe()
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
        this.RefreshGroupOpen();
        this.RefreshGroupRegister();
    });
  }
  UpdateGroup(item:GroupView) {
    debugger;
    localStorage.setItem("imgUpdate", item.contentImage);
    this.router.navigate(['/group-update/', item.IdGroup,2]);
  }
}
