import { Component, OnInit, HostListener } from '@angular/core';
import { GroupView } from './models/group-view';
import { LoadingService } from './services/loading.service';
import { FunctionGroupService } from './services/function-group.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @HostListener("window:onbeforeunload",["$event"])
  // onunload(event){
  //    ;
  //     localStorage.clear();
  // }
  constructor(private load: LoadingService, private func: FunctionGroupService) { }

  ngOnInit() {
    this.load.SetTimer().subscribe();
    this.func.LoadWebsite();

  }


  title = 'groupbuy';

}


/**
 * @title Basic buttons
 */