import { Injectable, Output, EventEmitter } from '@angular/core';
import { GroupView } from '../models/group-view';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { ChatGroup } from '../models/chat-group';
import { ChatUserRead } from '../models/chat-user-read';
import { ChatService } from './chat.service';
import { GroupService } from './group.service';
import { Groups } from '../models/groups';
import { group } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class FunctionGroupService {
  private subjectBasket = new Subject<any>();
  private subjectChat = new Subject<any>();
  private subjectComponent = new Subject<any>();
  basket: GroupView[] = [];
  GroupList: Groups[] = [];
  numItem: number;
  chatUserRead: ChatUserRead = new ChatUserRead();
  icons = {
    'חברה': 'business',
    'דגם': 'loyalty',
    'מחיר לאחר הנחה': 'local_atm',
    'מנהל המפגש': 'account_circle',
    'גיל יעד': 'people_outline',
    'מיקום': 'place'
  }
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
  colors = {
    'א': '#ecafa2',
    'ב': '#2dec14',
    'ג': '#97e8e7',
    'ד': 'darkred',
    'ה': '#e897e6',
    'ו': '#9a8ee0',
    'ז': '#8cd882',
    'ח': '#b054ec',
    'ט': '#97e465',
    'י': '#6decaa',
    'כ': '#aab7b0',
    'ל': '#b556a6',
    'מ': '#e83b76',
    'נ': '#d67b30',
    'ס': '#ffff00',
    'ע': '#adaae8',
    'פ': '#e85151',
    'צ': '#ffa500',
    'ק': '#00fff0',
    'ר': '#0af59c',
    'ש': '#fd1462c9',
    'ת': '#b250dcc9'

  };
  constructor(private router: Router, private chatService: ChatService, private groupService: GroupService) { }

  GetDetails(item: GroupView) {//פונקציה זו מקבלת קוד קבוצה ושולחת לדף נפרד את כל הפרטים
    localStorage.setItem("img", item.contentImage);
    this.router.navigate(['/details/', item.IdGroup]);
  }
  moveComponent(compId:string){
    this.subjectComponent.next(compId);
  }
  getCompMovebservable(): Observable<any> {
    return this.subjectComponent.asObservable();
  }
  /////////////////chat
  ReadMessageChat(Message: ChatGroup) {
     ;
    this.chatUserRead.IdChat = Message.IdChat;
    this.chatUserRead.IdUser = Number(localStorage.getItem("idUser"));
    this.chatUserRead.IdGroup = Message.IdGroup;
    this.chatService.ReadMessageChat(this.chatUserRead).subscribe(data => {
       ;
      this.subjectChat.next("read");

    });
  }
  getChatObservable(): Observable<any> {
    return this.subjectChat.asObservable();
  }
  GetNumNewMessageAfterLogin() {
    this.subjectChat.next("login");
  }
  ////////////////////basket
  LoadWebsite() {
    let length;
    if (localStorage.getItem("basket")) {
      this.basket = JSON.parse(localStorage.getItem("basket"));
      length = this.basket.length;
    }
    else
      length = 0;
    this.subjectBasket.next(length);

  }
  //בודקת את הסל אם יש בו קבוצות שכבר נסגרו אוו נמחקו - אם הם לא הגיעו
  CheckBasket(groups: GroupView[] = []) {
    if (localStorage.getItem("basket")) {
      this.groupService.GetAllGroupS().subscribe((data: Groups[]) => {
        this.GroupList = data;
        let j;
        this.basket = JSON.parse(localStorage.getItem("basket"));
        for (let i = 0; i < this.basket.length; i++) {
          for (j = 0; j < this.GroupList.length; j++) {
            if (this.basket[i].IdGroup == this.GroupList[j].IdGroup)
              break;
          }
          if (j == this.GroupList.length) {
            let item = this.basket[i];
            this.basket.splice(item.IdGroup, 1);
          }
        }
        localStorage.setItem("basket", JSON.stringify(this.basket));
      });
      if (groups.length > 0)
        this.CheckGroupIfBasket(groups);
    }
  }
  //בודקת מי מהקבוצות שהגיעו נמצאת בסל וצריך שיהיה לה סמל של הסרה
  CheckGroupIfBasket(groups: GroupView[]) {
    this.basket = JSON.parse(localStorage.getItem("basket"));
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < this.basket.length; j++) {
        if (groups[i].IdGroup == this.basket[j].IdGroup) {
          groups[i].basket = true;
        }
      }
    }
    this.subjectBasket.next(this.basket.length);
  }
  addToBasket(item) {
    item.basket = true;
    if (!localStorage.getItem("basket")) {
      this.basket = [];
      this.basket.push(item);
    }
    else {
      this.basket = JSON.parse(localStorage.getItem("basket"));
      this.basket.push(item);
    }
    localStorage.setItem("basket", JSON.stringify(this.basket));
     ;
    this.subjectBasket.next(this.basket.length);
  }

  removeFromBasket(item) {
    item.basket = false;
    this.basket = JSON.parse(localStorage.getItem("basket"));
    this.basket.splice(item, 1);
    if (this.basket.length == 0)
      localStorage.removeItem("basket");
    else
      localStorage.setItem("basket", JSON.stringify(this.basket));
    this.subjectBasket.next(this.basket.length);
  }
  getBasketObservable(): Observable<any> {
    return this.subjectBasket.asObservable();
  }
}
