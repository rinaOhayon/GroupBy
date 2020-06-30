import { Criterion } from "./criterion";
import { Category } from "./category";

export class GroupView {
    IdGroup:number;
    IdManager:number;
    NameManager:string;
    NameGroup:string;
    DateCreateGroup:string;//אין לי מושג למה זה מסוג מחרוזת אם תשנו תפני לנחמי
    NumMemberRegister:number;
    NumMembers:number;
    Register:boolean;
    DeadlineGroup:Date;
    CriterionList:Criterion[]=[];
    IdCategory:number;
    contentImage:string;
    Image:string;
    CategorySelected:Category;
    basket:boolean;
   ChatNotRead:number;
   NewMessageCount :number;
    constructor(){}
}
