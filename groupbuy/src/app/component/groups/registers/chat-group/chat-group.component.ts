import { Component, OnInit } from '@angular/core';
import { ChatGroup } from 'src/app/models/chat-group';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatUserRead } from 'src/app/models/chat-user-read';
import { RegisterGroupView } from 'src/app/models/register-group-view';
import { GroupService } from 'src/app/services/group.service';
import { Groups } from 'src/app/models/groups';
import { ChatListView } from 'src/app/models/chat-list-view';
import { FunctionGroupService } from 'src/app/services/function-group.service';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent implements OnInit {
  MessageChat: ChatGroup = new ChatGroup();
  chatList: ChatGroup[] = [];
  tempid: any;
  IdGroup: number;
  chatUserRead: ChatUserRead = new ChatUserRead();
  MembersofChat: RegisterGroupView[] = [];
  NumNewChat: number;
  MailToRegisterGroup: string="";
  IsManager: boolean = false;
  displayedColumns: string[] = ['NumReader', 'Read',  'Message'];
  today: Date = new Date();
  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute, private serviceGroup: GroupService, private func: FunctionGroupService) { }
  ngOnInit() {

    this.activatedRoute.params.subscribe(p => {
      this.tempid = p['idGroup'] || '';
      if (this.tempid != '') {
        this.IdGroup = this.tempid;
        this.GetIdManger();
        setInterval(() => { this.GetTheListChat(); }, 1000 * 60 * 5);

        this.GetTheListChat();//רפרוש של הרשימות
        this.NumNewChat = 0;
        this.MessageChat.Message='';
      }
    });
  }
  GetTheListChat() {
    debugger;
    if (Number(localStorage.getItem("idUser"))) {// אם בכלל אין מישהו שנרשם
      this.chatService.GetChatListView(this.IdGroup, Number(localStorage.getItem("idUser"))).subscribe(
        (data: ChatListView[]) => {
          this.chatList = data;
          this.chatList = this.chatList.sort(function compare(a, b) {
            var dateA = new Date(a.DateChat);
            var dateB = new Date(b.DateChat);
            return dateB.getTime() - dateA.getTime()
          });
          this.AccountNewMessageForGroup(this.IdGroup);
        });
      this.chatService.GetAllMemberinGroupForView(this.IdGroup).subscribe((data: RegisterGroupView[]) => {
        this.MembersofChat = data;
      });
    }
  }
  GetIdManger()//בדיקה האם זה מנהל הקבוצה
  {
    this.serviceGroup.GetGroupById(this.IdGroup).subscribe((data: Groups) => {
      if (data.IdManager == Number(localStorage.getItem("idUser"))) {
        this.IsManager = true;
      }
    })
  }
  AccountNewMessageForGroup(id: number) {

    for (let i = 0; i < this.chatList.length; i++) {
      if (Boolean(this.chatList[i].Read) == false)//אם עדיין לא קרא
      {
        this.NumNewChat++;
      }
    }
  }
  SendMailToregisterGroup()//שליחת מייל לכל החברים רק מנהל יכול
  {
    this.MailToRegisterGroup = "";
    this.serviceGroup.SendMailOftheregitergroup(this.IdGroup, this.MailToRegisterGroup).subscribe(data => {
    });
  }
  Send(event)
  {
    if(event.keyCode==13){
      this.CreateMessageChat();
    }
  }
  CreateMessageChat() {
    this.MessageChat.IdUser = Number(localStorage.getItem("idUser"));
    this.MessageChat.IdGroup = this.IdGroup;
    this.MessageChat.DateChat = new Date();
    
    this.chatService.CreateMessageChat(this.MessageChat).subscribe(
      (data: ChatGroup) => {
        //סימןו הודעה שנקראה למתמש שכתב את ההודעה החדשה
        this.MessageChat.Message="";
        this.ReadMessageChat(data.IdChat);
           
        
      }
    );
  }
  ReadMessageChat(idChat: number) {
    this.chatUserRead.IdChat = idChat;
    this.chatUserRead.IdGroup = this.IdGroup;

    this.chatUserRead.IdUser = Number(localStorage.getItem("idUser"));
    this.chatService.ReadMessageChat(this.chatUserRead).subscribe(data => {
      
      this.GetTheListChat();//רפרוש של הרשימות
      document.getElementsByClassName("example-table-container")[0].scrollTop=0;
    });
  }
  compareDate(e: Date) {

    var elemnt = new Date(e.toString());
    if (elemnt.getFullYear() == this.today.getFullYear() && elemnt.getMonth() == this.today.getMonth() && elemnt.getDate() == this.today.getDate()-1)
      return 1;
    if (elemnt.getFullYear() == this.today.getFullYear() && elemnt.getMonth() == this.today.getMonth() && elemnt.getDate() == this.today.getDate())
      return 0;
    return -1;
  }
}
