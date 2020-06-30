import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Groups } from 'src/app/models/groups';
import { GroupService } from 'src/app/services/group.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  tempid: '';
  groupDetails: Groups;
  constructor(private groupService: GroupService, private activatedRoute: ActivatedRoute,public sanitizer: DomSanitizer) { }
  url: string = null;
  blob: Blob;
  urlShow: any;
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
  }
 public icons={
  'חברה': 'business',
  'דגם': 'loyalty',
  'מחיר רגיל': 'local_atm',
  'מנהל המפגש': 'account_circle',
  'גיל יעד': 'people_outline',
  'מיקום': 'place'
}

  ngOnInit() {
   
    this.activatedRoute.params.subscribe(p => {
      this.tempid = p['id'] || '';

      if (this.tempid != '') {
        this.groupService.GetGroupById(this.tempid).subscribe((data: Groups) => {
          this.groupDetails = data;
          this.blob = this.dataURItoBlob(localStorage.getItem("img"));
          this.url = window.URL.createObjectURL(this.blob);
         this.groupDetails['imageSrc'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);;

        });
      }

    });
  }
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
  async sendMailAlert()//שלחת שאלה במייל למנהל הקבוצה
 {
  const {value: formValues} = await Swal.fire({
    position:"bottom",
    confirmButtonColor:'#eb3b52',
    confirmButtonText:'שלח',
    showCloseButton:true,
    title: 'מייל',
    
    html:
      '<input  placeholder="נושא" id="subject" class="swal2-input">' +
      '<input placeholder="גוף ההודעה" id="bodymessage" class="swal2-input">'+
      '<input type=email id="mail" placeholder="מייל להשבה" id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    imageUrl: '../.../../assets/logo-finish.png',
    imageWidth: 160,
    imageHeight: 80,
    imageAlt: 'GroupBy',
    
    preConfirm: () => {
      return [
        document.getElementById('subject'),
        document.getElementById('bodymessage'),
        document.getElementById('mail'),

      ]
    }
  })
  
  if (formValues) {
   
    this.groupService.SendMailTotheManager(this.groupDetails.IdManager,formValues).subscribe(data=>{
      alert("I finish");
    },error=>{
      alert("I fail");
    });
   // Swal.fire(JSON.stringify(formValues))
  }
 }
 

}
