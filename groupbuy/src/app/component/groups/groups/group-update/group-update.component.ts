import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Groups } from 'src/app/models/groups';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { Criterion } from 'src/app/models/criterion';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/models/property';
import { MatDialogRef, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
}
@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} },

  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
})
export class GroupUpdateComponent implements OnInit {
  view: number;

  constructor(private groupService: GroupService,private router:Router, private categoryService: CategoryserviceService, private adapter: DateAdapter<any>, private propertySerevice: PropertyService, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder,
    public sanitizer: DomSanitizer) { }
  g: Groups = new Groups(1);
  LastG: any;
  tempid: '';
  today = new Date();
  cat: string;
  length: number = 0;
  url: any = '';
  url1: any = '';
  ifUpdate: boolean = false;
  file: any;
  filesUpload: any[] = [];
  quantityMember = new FormControl('');
  CategoryOFg: Category;//מחזיק את הקטגוריה של הקבוצה שהגיע בעת טעינה, אם השתנתה הקטגוריה משתנה ג"כ

  blob: Blob;
  urlShow: any;
  @ViewChild("selectCat") select;
  ngOnInit() {
    this.adapter.setLocale('fr');
    this.quantityMember.setValidators(Validators.min(0));
    this.quantityMember.setValidators(Validators.max(4))
    this.quantityMember.setValidators(Validators.min(1));
    this.activatedRoute.params.subscribe(p => {
      this.tempid = p['id'] || '';
      this.view=p['view']||'';
      if (this.tempid != ''&&this.view!=null) {
        this.groupService.GetGroupById(this.tempid).subscribe((data: Groups) => {//קבלת הקבוצה הרצויה
          this.g = data;
          this.blob = this.dataURItoBlob(localStorage.getItem("imgUpdate"));
          //this.blob = this.dataURItoBlob(this.g.contentImage);
          this.url = window.URL.createObjectURL(this.blob);
          this.g['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          this.LastG = JSON.parse(JSON.stringify(this.g));

          this.LastG['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

          //end
          this.categoryService.GetCategoryById(this.g.IdCategory).subscribe((data: Category) => {//קבלת הקטגוריה שנבחרה

            this.CategoryOFg = data;
            this.cat = this.CategoryOFg.NameCategory;
            this.propertySerevice.GetPropertyById(this.CategoryOFg.IdTypeGroup).subscribe((data: Property[]) => {//קבלת מס הפרמטרים הקבועים
              this.length = data.length;
            });
          });
        });
      }

    });
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
  //יצירת בלוב 
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
  categoryChoose(event: Category) {
    this.CategoryOFg = event;
    this.cat = this.CategoryOFg.NameCategory || null;
  }
  clickAddCritarion() {

    this.g.CriterionList.push(new Criterion());
  }
  clickRemoveCritarion() {
    if (this.g.CriterionList.length > this.length) {
      let lengthOfGroupList = this.g.CriterionList.length - 1;
      this.g.CriterionList = this.g.CriterionList.splice(0, lengthOfGroupList);
    }
  }

  onSelectFile(event, file) {
    this.file = file[0];
    this.filesUpload.push(file);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.g['imageSrc'] = event.target['result'];
       
      }
    }
  }
  submitUpdateGroup() {

    document.getElementById("screenVisible").style.display = "block";

    this.groupService.UpdateGroup(this.g, this.file).subscribe(response => {
      document.getElementById("screenVisible").style.display = "none";
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'העדכון בוצע בהצלחה',
        showConfirmButton: false,
        timer: 8000
      }).then((result)=>{
        if (this.view==1) {
          this.router.navigate(['/group-view']);
        }
       else if (this.view ==2) {
        this.router.navigate(['/performance']);
          
        }
      });
     
    },err=>{
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'העדכון נכשל',
        showConfirmButton: false,
        timer: 6000
      }).then((result)=>{
        if (this.view==1) {
          this.router.navigate(['/group-view']);
        }
       else if (this.view ==2) {
        this.router.navigate(['/performance']);
        }
      });
    
    }
    );
  }
  Reset() {
    this.g = this.LastG;
    this.g['imageSrc'] = this.LastG.imageSrc;
  }
}
