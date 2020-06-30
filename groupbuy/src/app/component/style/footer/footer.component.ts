import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  MailToRegisterGroup: string;

  constructor(private serviceGroup:GroupService) { }

  ngOnInit() {
  }
  SendMessageToUs(){
    this.MailToRegisterGroup = "";
  this.serviceGroup.SendMailOftheregitergroup(0,this.MailToRegisterGroup).subscribe(data => {
    
  });
  }
  
}
