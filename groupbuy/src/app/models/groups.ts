import { Category } from "./category";
import { Criterion } from "./criterion";


export class Groups {
    IdGroup:number;
    IdManager:number;
    NameGroup:string;
    DateCreateGroup:Date;
    NumMembersGroup:number;
    DeadlineGroup:Date;
    IdCategory:number;
    StatusGroup:number;
    FreeDescription:string;
    Image:string;
    IdTypeGroup:number;
    contentImage:string;
    // NameCategory:string;

    CriterionList:Criterion[]=[];

     constructor(status:number){
          this.DateCreateGroup=new Date();
          this.StatusGroup=status;
      }
    //   constructor(idmanager:number,namegroup:string,numMembergroup:number,deadlineGroup:Date,idcategory:number,status:number,freeDescription:string,idtype:number,namecategory:string){
    //     this.IdManager=idmanager;
    //     this.NameGroup=namegroup;
    //     this.DateCreateGroup=new Date();
    //     this.NumMembersGroup=numMembergroup;
    //     this.DeadlineGroup=deadlineGroup;
    //     this.IdCategory=idcategory;
    //     this.StatusGroup=status;
    //     this.FreeDescription=freeDescription;
    //     this.IdTypeGroup=idtype;
    //     this.NameCategory=namecategory;
    // }
}
