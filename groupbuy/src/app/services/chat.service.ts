import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatGroup } from '../models/chat-group';
import { environment } from 'src/environments/environment';
import { RegisterGroupView } from '../models/register-group-view';
import { ChatUserRead } from '../models/chat-user-read';
import { ChatListView } from '../models/chat-list-view';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  GetChatOfGroup(idGroup: number,idUser): Observable<ChatGroup[]> {
    return this.http.get<ChatGroup[]>(environment.api + 'ChatGroup/GetChatOfGroup/' + idGroup+'/'+idUser);//צריך להוסיף ID של קבוצה
  }
  GetChatListView(idGroup: number,idUser): Observable<ChatListView[]> {
    return this.http.get<ChatListView[]>(environment.api + 'ChatGroup/GetChatListView/' + idGroup+'/'+idUser);//צריך להוסיף ID של קבוצה
  }
  GetAllMemberinGroupForView(idGroup: number): Observable<RegisterGroupView[]> {
    return this.http.get<RegisterGroupView[]>(environment.api + 'MembersGroup/GetAllMembers/' + idGroup);//צריך להוסיף ID של קבוצה
  }
  CreateMessageChat(chat: ChatGroup) {
     ;
    return this.http.post(environment.api + 'ChatGroup/CreateMessageChat',chat);
  }
  ReadMessageChat(chatRead: ChatUserRead) {
    return this.http.post(environment.api + 'ChatGroup/ReadMessageChat', chatRead);
  }
}
