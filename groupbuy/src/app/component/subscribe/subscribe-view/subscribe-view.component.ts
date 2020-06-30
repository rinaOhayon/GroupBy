import { Component, OnInit } from '@angular/core';
import { Subscribe } from 'src/app/models/subscribe';
import { SubscribeService } from 'src/app/services/subscribe.service';
import Swal from 'sweetalert2';
import { MatDialogConfig, MatDialog, MatDialogRef, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { SubscribeUpdateComponent } from '../subscribe-update/subscribe-update.component';
import { CriterionSubscribe } from 'src/app/models/criterion-subscribe';

@Component({
  selector: 'app-subscribe-view',
  templateUrl: './subscribe-view.component.html',
  styleUrls: ['./subscribe-view.component.css']
})
export class SubscribeViewComponent implements OnInit {



  constructor(private subscibeService:SubscribeService,private dialog: MatDialog,private dialogRef: MatDialogRef<SubscribeUpdateComponent>) { }
AlltheSubsribes:Subscribe[]=[];
idUser:number;
searchBy:string;
searchSubscribeList:Subscribe[]=[];//חיפוש
  ngOnInit() {
   this.GetAlltheSubscribe();
  }
  GetAlltheSubscribe()
  {
    this.idUser=Number(localStorage.getItem("idUser"));

    this.subscibeService.GetAllSubscribe().subscribe((data:Subscribe[])=>{
      this.AlltheSubsribes=data;
      this.searchSubscribeList=data;
    },
      error=>{
  
      })
  }
  DeleteSubscibe(idsubscribe:number)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
     this.subscibeService.DeleteSubscribe(idsubscribe).subscribe(data=>{
   Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then((result)=>{this.GetAlltheSubscribe()}
       
        )},
  error=>{
    Swal.fire(
      'Failed!',
      '',
      'error'
    )
  });
 
      }
    })
  }
  UpdateopenDialogGroup(item:Subscribe) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: 5,
      title: 'Angular For Beginners',
      subscribe:item
    };
    const dialogRef= this.dialog.open(SubscribeUpdateComponent,dialogConfig );
dialogRef.afterClosed().subscribe()
  }
isKeyCreterionList:CriterionSubscribe[]=[];
isValueCreterionList:CriterionSubscribe[]=[];
search1:Subscribe[]=[];
search()
{
  
this.search1=[];
this.isKeyCreterionList=[];
this.isValueCreterionList=[];
// if(this.searchBy=="")//אם אין מה לחפש שיחזיר את הכל
// {
this.searchSubscribeList=this.AlltheSubsribes;
// }
// else{
for(let i=0;i<this.searchSubscribeList.length;i++)
{
this.isKeyCreterionList.push(...this.AlltheSubsribes[i].CriterionSubscribe.filter(d=> d.KeyCriterion.toLowerCase().includes(this.searchBy)));
this.isValueCreterionList.push(...this.AlltheSubsribes[i].CriterionSubscribe.filter(d=> d.ValueCriterion.toLowerCase().includes(this.searchBy)));
}
for (let j = 0; j < this.searchSubscribeList.length; j++) {
  if (this.isKeyCreterionList.find(s => s.IdSubscribe == this.searchSubscribeList[j].IdSubscribe)) 
  {
    this.search1.push(this.searchSubscribeList[j]);
  }
  else if(this.isValueCreterionList.find(c=> c.IdSubscribe==this.searchSubscribeList[j].IdSubscribe))
  {
    this.search1.push(this.searchSubscribeList[j]);
  }
  else if(this.searchSubscribeList[j].NameSubscribe.toLowerCase().includes(this.searchBy))
  {
    this.search1.push(this.searchSubscribeList[j]);
  }
  else if(this.searchSubscribeList[j].TextFree.toLowerCase().includes(this.searchBy))
  {
    this.search1.push(this.searchSubscribeList[j]);
  }
 }
console.log("search1",this.search1);
 if(this.search1==null)
 this.searchSubscribeList=[];
 else{
  this.searchSubscribeList=this.search1;
 }
}


// this.searchListData = this.AlltheOpenGroups.filter(p => p.NameGroup.toLowerCase().includes(this.searchByName.toLowerCase()))
//     if (this.searchByKod)
//       this.searchListData = this.searchListData.filter(p => p.IdGroup == Number(this.searchByKod));
//     if (this.ParentCategoryChoose) {
//       if (this.ParentCategoryChoose.IdCategory != 1)
//         this.searchListData = this.searchListData.filter(p => p.CategorySelected.IdParentCategory == this.ParentCategoryChoose.IdCategory)

//     }
//     if (this.SubCategoryChoose)
//       this.searchListData = this.searchListData.filter(p => p.CategorySelected.IdCategory == this.SubCategoryChoose.IdCategory)
//     if (this.searchByFreeText) {
//       this.searchFreeText();
//     }
}