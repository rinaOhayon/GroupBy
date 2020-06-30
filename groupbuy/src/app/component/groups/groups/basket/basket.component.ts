import { Component, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups';
import { GroupView } from 'src/app/models/group-view';
import { FunctionGroupService } from 'src/app/services/function-group.service';
import { PageEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  GroupList: Groups[] = [];
  basketsList: GroupView[] = [];
  blob: Blob;
  url: string = null;
  urlShow: any;
  idUserSurfing: number;
  pageEvent: PageEvent;
  DataPaginatorBaketGroups: GroupView[];
  lengthItems: number;
  pageSize: number;
  subscriptionBasket: Subscription;

  constructor(private func: FunctionGroupService, public sanitizer: DomSanitizer, private groupService: GroupService) {
    this.subscriptionBasket = this.func.getBasketObservable().subscribe(length => {
      this.refreshBasket();
    });
  }

  ngOnInit() {
    this.refreshBasket();

  }

  refreshBasket() {
    this.func.CheckBasket();
    this.basketsList = JSON.parse(localStorage.getItem("basket"));
      this.basketsList.forEach(res => {
        this.blob = this.dataURItoBlob(res.contentImage);
        this.url = window.URL.createObjectURL(this.blob);
        res['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      });
      this.lengthItems = this.basketsList.length;
      this.pageSize = 3;
      this.fillGroups(0);
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.func.filesExtensions['.png']
    });
  }
  Getdata(event) {
    this.fillGroups(event.pageIndex);
    window.scroll(0,0);

  }
  fillGroups(pageIndex: number) {
    this.DataPaginatorBaketGroups = this.basketsList.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
    this.lengthItems = this.DataPaginatorBaketGroups.length;
  }
}
