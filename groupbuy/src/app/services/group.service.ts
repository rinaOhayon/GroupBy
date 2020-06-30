import { Injectable } from '@angular/core';
import { Groups } from '../models/groups';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { GroupView } from '../models/group-view';
import { GroupRegister } from '../models/group-register';
import { RegisterGroupView } from '../models/register-group-view';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  IdGroup: number;//משנה המיועד לרישום לקבוצה. בשימוש מדף פרטי קבוצה ורישום לקבוצה
  NameGroup: string;
  group: Groups = new Groups(1);
  GroupCreate(group: Groups, file, register: GroupRegister) {
    ;
    //קוד להעלת התמונה באמצע לכתיבה
    const formData = new FormData();
    //formData.append(file.name, file);
    formData.append('uploadFile', file, file.relativePath);
    formData.append('group', JSON.stringify(group));
    formData.append('register', JSON.stringify(register));

    return this.http.post(environment.api + 'Groups/CreateGroup', formData);
    // return this.http.post(environment.api + 'Groups/CreateGroup', group);
  }
  GetAllGroups(IdUser: number): Observable<GroupView[]> {
    return this.http.get<GroupView[]>(environment.api + 'Groups/GetAllGroups/' + IdUser);

  }
  GetAllGroupS(): Observable<Groups[]> {
    return this.http.get<Groups[]>(environment.api + 'Groups/GetAllGroupS');

  }
  GetGroupById(id: number): Observable<Groups> {
    return this.http.get<Groups>(environment.api + 'Groups/GetGroup/' + id);
  }
  GetPropertyById(id: number): Observable<Property[]> {
    return this.http.get<Property[]>(environment.api + 'PropertyOfGroup/GetAllProperty/' + id);
  }
  UpdateGroup(group: Groups, file) {
debugger;
    const formData = new FormData();

    //formData.append(file.name, file);
    if (file != null)
      formData.append('uploadFile', file, file.relativePath);
    formData.append('group', JSON.stringify(group));
    return this.http.post(environment.api + 'Groups/UpdateGroup/', formData);

  }
  //לא  מחיקה אמיתית רק שינוי מצב
  DeleteGroup(group: Groups) {
    return this.http.put(environment.api + 'Groups/UpdateDeleteGroup/', group.IdGroup);
  }
  // GetNameGroup(): Observable<string> {//קבל את שם הקבוצה שרוצה להירשם אליה
  //   return this.http.get<string>(environment.api + 'Groups/GetNameGroup/' + this.IdGroup);
  // }
  //חברים לקבוצה
  MemberRegisterCreate(register: GroupRegister) {
    return this.http.post(environment.api + 'MembersGroup/CreateMembers', register);
  }
  ExistsMemberINGroup(idUser: number, idGroup: number) {
    return this.http.get(environment.api + 'MembersGroup/ExistMembers/' + idUser + '/' + idGroup);
  }
  UpdateMemberINGroup(member: GroupRegister) {
    return this.http.put(environment.api + 'MembersGroup/UpdateMember/', member);
  }
  GetMemberINGroupForUpdate(idUser: number, idGroup: number): Observable<GroupRegister> {
    return this.http.get<GroupRegister>(environment.api + 'MembersGroup/GetMember/' + idUser + '/' + idGroup);
  }
  DeleteMemberInGroup(idUser: number, IdGroup: number) {
    return this.http.delete(environment.api + 'MembersGroup/DeleteMember/' + idUser + '/' + IdGroup);
  }
  GetAllMemberinGroupForView(idGroup: number): Observable<RegisterGroupView[]> {
    return this.http.get<RegisterGroupView[]>(environment.api + 'MembersGroup/GetAllMembers/' + idGroup);//צריך להוסיף ID של קבוצה
  }
  SendMailTotheManager(idManager: Number, BodyMail: string[]) {
    alert(BodyMail);

    return this.http.get(environment.api + 'Groups/SendMailToManger/' + idManager + '/' + BodyMail);
  }
  SendMailOftheregitergroup(idGroup: number, Message: string) {
    ;
    return this.http.get(environment.api + 'MembersGroup/SendMailRegisterGroup/' + idGroup + '/' + Message);
  }

}
