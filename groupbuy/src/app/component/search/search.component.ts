import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/models/search';
import { E } from '@angular/core/src/render3';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

@Input() item:any;
@Output() 
change1:EventEmitter<any>=new EventEmitter<any>();






// SendSearch() {
//   this.search.emit(this.s);
// } 
SendSearch() {
  this.change1.next(this.item);
}




  s: Search = new Search();
  @Output()
  search: EventEmitter<Search> = new EventEmitter<Search>();
  constructor(private route: ActivatedRoute) {

  }

 

  ngOnInit() {

  }
  onSubmitSearch() {
    const url = this.route.url;

  }
}
