import { CriterionSubscribe } from "./criterion-subscribe";
import { Category } from "./category";

export class Subscribe {
    IdSubscribe:number;
    IdUser:number;
    IdCategory:number;
    GetMessage:number;
    TextFree:string;
     Deadline:any;
     NameSubscribe:string;
    DateCreateSubscribe:Date;
    
    CriterionSubscribe:CriterionSubscribe[]=[];
    NameCategory:string;
    Category:Category;
    constructor(){
      this.DateCreateSubscribe=new Date();
    }
}

