import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Criterion } from 'src/app/models/criterion';

@Component({
  selector: 'app-criterion-create',
  templateUrl: './criterion-create.component.html',
  styleUrls: ['./criterion-create.component.css']
})
export class CriterionCreateComponent implements OnInit {
  @Input() index = 0;
  @Output() create = new EventEmitter<Criterion>();
  constructor() { }
  c: Criterion = new Criterion();
  ngOnInit() {
  }
  addCriterion() {
    if (this.c.KeyCriterion && this.c.ValueCriterion)
      this.create.emit(this.c);
  }
}
