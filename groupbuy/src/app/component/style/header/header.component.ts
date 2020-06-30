import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';
import { PerformanceService } from 'src/app/services/performance.service';
import { FunctionGroupService } from 'src/app/services/function-group.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterComponent } from '../../user/register/register.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  subscriptionBasket: Subscription;
  subscriptionChat: Subscription;
  subscriptionCompMove: Subscription;
  locals: boolean = false;
  NumNewMessageChat: number;
  NumItemBasket: any;
  nameUser: string;
  constructor(private groupService: GroupService, private performance: PerformanceService, private func: FunctionGroupService, private router: Router, private dialog: MatDialog) {
    this.subscriptionBasket = this.func.getBasketObservable().subscribe(length => {

      this.NumItemBasket = length;
    });
    // this.subscriptionCompMove = this.func.getCompMovebservable().subscribe((IdComp: string) => {
    //   debugger;
    //   if (document.getElementsByClassName("clickLi").length > 0)
    //     document.getElementsByClassName("clickLi")[0].classList.remove("clickLi");
    //   document.getElementById(IdComp).classList.add("clickLi");
    // });
    this.subscriptionChat = this.func.getChatObservable().subscribe(active => {
      debugger;
      if (active == "read") {
        debugger;
        this.NumNewMessageChat--;
      }
      else if (active == "login") {
        this.GetNumNewMessage();
        this.nameUser = localStorage.getItem("NameUser");
        this.locals = true;

      }
    });
  }

  //#eb3b52
  last: HTMLElement;
  ngOnInit() {
    if (localStorage.getItem("idUser")) {
      this.GetNumNewMessage();
      this.nameUser = localStorage.getItem("NameUser");
      this.locals = true;

    }
    else {
      this.locals = false;
    }
    // var t = document.getElementsByTagName("a");
    this.last = document.getElementById("home");
      this.last.classList.add("clickLi");
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  color(event: HTMLElement) {
    debugger;
    this.last.classList.remove("clickLi");
    this.last = event;
    this.last.classList.add("clickLi");
    console.log(event);
  }
  lastRegister: HTMLElement;
  Lastcolor(event: HTMLElement) {
    debugger;
    this.lastRegister = this.last;//לשמור איפה היו לפני הלחיצה על רישום
    this.last.classList.remove("clickLi");//מסיר ממנו
    this.last = event;

    this.last.classList.add("clickLi");
  }
  GetNumNewMessage() {

    this.performance.GetNumNewMessage(Number(localStorage.getItem("idUser"))).subscribe(
      (data: number) => {
        this.NumNewMessageChat = data;
      });
  }
  GoTOPerformance() {
    this.router.navigate(['/performance']);
  }
  Exit() {
    localStorage.removeItem("idUser");
    localStorage.removeItem("NameUser");
    this.router.navigate(['/']);
    this.func.moveComponent("home");
    this.locals = false;
  }
  OpenDialogRegister() {
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
      //if (data != undefined) {//אם הדיאלוג נסגר בגלל שלא נרשם
        this.last.classList.remove("clickLi");
        this.last = this.lastRegister;
        this.last.classList.add("clickLi");
     // }
    });
  }
  OpenDialogRegisterForCreate() {
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
        this.router.navigate(['/group-create']);

      }
    });
  }
  //todo
  openMessageInCreateGroup() {
    Swal.fire({
      title: ' אינך יכול לפתוח קבוצה',
      text: "עליך להרשם/להכנס  לאתר",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef495c',
      cancelButtonColor: 'grey',
      confirmButtonText: 'הכנס/הרשם!',
      cancelButtonText: 'ביטול'

    }).then((result) => {
      if (result.value) {
        this.OpenDialogRegisterForCreate();
      }
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.router.navigate(['/']);
        this.func.moveComponent("home");
      }
    })
  }
}

