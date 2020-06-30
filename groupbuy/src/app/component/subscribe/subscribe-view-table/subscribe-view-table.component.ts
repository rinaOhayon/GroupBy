import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { Subscribe } from 'src/app/models/subscribe';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { SubscribeUpdateComponent } from '../subscribe-update/subscribe-update.component';
import { CriterionSubscribe } from 'src/app/models/criterion-subscribe';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Category } from 'src/app/models/category';
import { RegisterComponent } from '../../user/register/register.component';
import { environment } from 'src/environments/environment';
import { FunctionGroupService } from 'src/app/services/function-group.service';
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'קבוצות לעמוד';
  customPaginatorIntl.nextPageLabel = 'העמוד הבא';
  customPaginatorIntl.previousPageLabel = 'העמוד הקודם';
  customPaginatorIntl.firstPageLabel = 'העמוד הראשון';
  return customPaginatorIntl;
}
@Component({
  selector: 'app-subscribe-view-table',
  templateUrl: './subscribe-view-table.component.html',
  styleUrls: ['./subscribe-view-table.component.css'],
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

export class SubscribeViewTableComponent implements OnInit {
  AlltheSubsribes: Subscribe[] = [];
  idUser: number;
  searchBy: string;
  searchSubscribeList: Subscribe[] = [];//חיפוש
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  locals: boolean = false;
  constructor(private subscibeService: SubscribeService,private func:FunctionGroupService, private categoryService: CategoryserviceService, private dialog: MatDialog, private dialogRef: MatDialogRef<SubscribeUpdateComponent>) { }

  ngOnInit() {
this.func.moveComponent("SubscribeView");
    this.GetAlltheSubscribe();

  }
  IdSubscribe: number;
  IdUser: number;
  IdCategory: number;
  GetMessage: number;
  TextFree: string;
  Deadline: any;
  NameSubscribe: string;
  DateCreateSubscribe: Date;
  NameCategory: string;
  columnsToDisplay = ['IdSubscribe', 'NameSubscribe', 'DateCreateSubscribe', 'IdCategory', 'TextFree', 'sd'];
  columnsNames = ['קוד בקשה', 'שם הבקשה', 'תאריך הבקשה', 'קטגוריה', 'תאור'];

  GetAlltheSubscribe() {
    this.idUser = Number(localStorage.getItem("idUser"));

    this.subscibeService.GetAllSubscribe().subscribe((data: Subscribe[]) => {
      this.AlltheSubsribes = data;
      this.searchSubscribeList = data;
      // for(let i=0;i<this.searchSubscribeList.length;i++)
      // {
      //   this.categoryService.GetCategoryById(this.searchSubscribeList[i].IdCategory).subscribe((data1: Category) => {//קבלת הקטגוריה שנבחרה
      //     this.searchSubscribeList[i].NameCategory = data1.NameCategory;

      // })};
      // fillGroups(pageIndex) {
      //   this.DataPaginatorList = this.searchListData.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
      //   this.lengthItems = this.searchListData.length;
      // }
      this.searchSubscribeList = this.searchSubscribeList.sort(function compare(a, b) {
        var dateA = new Date(a.DateCreateSubscribe);
        var dateB = new Date(b.DateCreateSubscribe);
        return dateA.getTime() - dateB.getTime()
      });
      this.searchSubscribeList.reverse();
      this.subscibeService.dataSource = new MatTableDataSource<Subscribe>(this.searchSubscribeList);
      this.subscibeService.dataSource.paginator = this.paginator;
      //this.subscibeService.dataSource.paginator.pageSize=this.paginator.pageSizeOptions[1];
      if (localStorage.getItem("idUser")) {
        this.locals = true;
      }
    },
      error => {

      })
  }
  DeleteSubscibe(idsubscribe: number) {
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
          ).then((result) => { this.GetAlltheSubscribe() }

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
  UpdateopenDialogGroup(item: Subscribe) {
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
    dialogRef.afterClosed().subscribe(data=>{
      if(data==undefined)
      this.GetAlltheSubscribe();
    }
    )
  }
  isKeyCreterionList: CriterionSubscribe[] = [];
  isValueCreterionList: CriterionSubscribe[] = [];
  search1: Subscribe[] = [];

  search() {
    this.search1 = [];
    this.isKeyCreterionList = [];
    this.isValueCreterionList = [];
    // if(this.searchBy=="")//אם אין מה לחפש שיחזיר את הכל
    // {
    this.searchSubscribeList = this.AlltheSubsribes;
    // }
    // else{
    for (let i = 0; i < this.searchSubscribeList.length; i++) {
      this.isKeyCreterionList.push(...this.AlltheSubsribes[i].CriterionSubscribe.filter(d => d.KeyCriterion.toLowerCase().includes(this.searchBy)));
      this.isValueCreterionList.push(...this.AlltheSubsribes[i].CriterionSubscribe.filter(d => d.ValueCriterion.toLowerCase().includes(this.searchBy)));
    }
    for (let j = 0; j < this.searchSubscribeList.length; j++) {
      if (this.isKeyCreterionList.find(s => s.IdSubscribe == this.searchSubscribeList[j].IdSubscribe)) {
        this.search1.push(this.searchSubscribeList[j]);
      }
      else if (this.isValueCreterionList.find(c => c.IdSubscribe == this.searchSubscribeList[j].IdSubscribe)) {
        this.search1.push(this.searchSubscribeList[j]);
      }
      else if (this.searchSubscribeList[j].NameSubscribe.toLowerCase().includes(this.searchBy)) {
        this.search1.push(this.searchSubscribeList[j]);
      }
      else if (this.searchSubscribeList[j].TextFree.toLowerCase().includes(this.searchBy)) {
        this.search1.push(this.searchSubscribeList[j]);
      }
    }
     ;
    console.log("search1", this.search1);
    if (this.search1 == null)
      this.subscibeService.dataSource = [];
    else {
      this.subscibeService.dataSource = new MatTableDataSource<Subscribe>(this.search1);
      this.subscibeService.dataSource.paginator = this.paginator;
    }
  }
  openNav() {
    let side = document.getElementById("mySidenav");
    // side.style.width = "250px";
    // side.style.paddingRight = "3vw";
    side.style.height = "45vh";
    side.style.paddingTop = "60px";
    side.style.zIndex="5";
  }

  closeNav() {
    let side = document.getElementById("mySidenav");
    side.style.height = "0";
    side.style.paddingTop = "0";
    side.style.zIndex="0";

  }
  RefreshStatusComponent()//פונקציה זאת נועדה כדי שאם בן אדם יכנס לאתר אז יוכל ליצור בקשה
  {
    if (localStorage.getItem("idUser")) {
      this.locals = true;
    }
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
        this.locals = true;
        this.idUser = Number(localStorage.getItem("idUser"));
      }
    });
  }

}
