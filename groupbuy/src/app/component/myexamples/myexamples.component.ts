
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { CategoryChildren } from 'src/app/models/category-children';
import {  MatAutocompleteSelectedEvent } from '@angular/material';

export const _filter = (opt: Category[], value: string): Category[] => {//סינון הקטגוריות
  return opt.filter(item => item.NameCategory.indexOf(value) === 0);
};

@Component({
  selector: 'app-myexamples',
  templateUrl: './myexamples.component.html',
  styleUrls: ['./myexamples.component.css']
})
export class MyexamplesComponent implements OnInit {

arr=["rivka","rina","angular"];

Func(event){
  alert(event);
  console.log(event);
}






  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  name: any;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  ggg(){
     ;
    console.log(this.name);
  }
}
