import { Component, OnInit } from '@angular/core';
import { GroupView } from 'src/app/models/group-view';
import { PageEvent } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { PerformanceService } from 'src/app/services/performance.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FunctionGroupService } from 'src/app/services/function-group.service';

@Component({
  selector: 'app-group-closed-created',
  templateUrl: './group-closed-created.component.html',
  styleUrls: ['./group-closed-created.component.css']
})
export class GroupClosedCreatedComponent implements OnInit {

  length: number;
  pageSize: number;

  constructor(private groupService: GroupService,private performance:PerformanceService, public sanitizer: DomSanitizer, private router: Router, private func: FunctionGroupService) { }
  num: number;
  blob: Blob;
  url: string = null;
  urlShow: any;
  idUserSurfing:number;
  pageEvent:PageEvent;
  ClosedGroup: GroupView[];
  DataPaginatorListClosedGroup:GroupView[];
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
    'מחיר רגיל': 'local_atm',
    'מנהל המפגש': 'account_circle',
    'גיל יעד': 'people_outline',
    'מיקום': 'place'
  }
 
  ngOnInit() {
    this.performance.GetAllClosedCreatedGroups(Number(localStorage.getItem("idUser"))).subscribe((data: GroupView[]) => {
      this.ClosedGroup = data;
      this.ClosedGroup.forEach(res => {
        this.blob = this.dataURItoBlob(res.contentImage);
        this.url = window.URL.createObjectURL(this.blob);
        res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      });
      this.length=this.ClosedGroup.length;
      this.pageSize=3;
      this.fillGroups(0);
    });
    this.idUserSurfing=Number(localStorage.getItem("idUser"));
    this.func.moveComponent("ClosedGroup");
  }
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
  ChatOfGroup(item) {
    //todo לשלוח גם מספר הודעות שלא נקראו
    console.log(item.ChatNotRead);
    this.router.navigate(['/ChatGroup/', item.IdGroup,item.ChatNotRead]);
  }
 
  AllRegisterOfGroup(item: GroupView) {//צפיה למנהל הקבוצה בכל האנשים שנרשמו למערכת
    this.router.navigate(['/group-register-view/', item.IdGroup]);
  }
  Getdata(event) {
    this.fillGroups(event.pageIndex);
    window.scroll(0,0);

  }
  fillGroups(pageIndex: number) {
    this.DataPaginatorListClosedGroup = this.ClosedGroup.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
    //this.length = this.DataPaginatorListClosedGroup.length;
  }

}
