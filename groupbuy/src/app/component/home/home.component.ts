import { Component, OnInit } from '@angular/core';
import { FunctionGroupService } from 'src/app/services/function-group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private func:FunctionGroupService) { }
  last:HTMLElement=null;
explain:number=1;
  ngOnInit() {
    this.changeImage("1");
    this.func.moveComponent("home");
  }
  changeImage(cls){
    this.explain=Number(cls);
    if(this.last!=null){
      this.last.style.borderBottom="";
    }
   this.last=document.getElementById('explain'+cls);
   this.last.style.borderBottom="4px solid #eb3b52";
  }

}
