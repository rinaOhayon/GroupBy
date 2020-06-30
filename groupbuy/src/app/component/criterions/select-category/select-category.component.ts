
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { CategoryChildren } from 'src/app/models/category-children';
import { MatAutocompleteSelectedEvent, MatOption } from '@angular/material';
import { ValueTransformer } from '@angular/compiler/src/util';

export const _filter = (opt: Category[], value: string): Category[] => {//סינון הקטגוריות
  return opt.filter(item => item.NameCategory.indexOf(value) === 0);
};
@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  s: string = "רכב";
  category: Category[] = [];
  selectedCategory;//קטגוריה שנבחרה
  selectText;//ngModel-name
  @Input() value;
  // @ViewChild('selectGroup') selectGroup;
  @Output() CategorySelected: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() corectCategory: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() focuscategory: EventEmitter<string> = new EventEmitter<string>();
  stateForm: FormGroup = this._formBuilder.group({
    CategoryChildren: '',
  });
  ParentCategory: Category[] = [];//שמירת אב קטגוריה
  ChildrenCategory: Category[] = [];//שמירת תת קטגוריה
  categoryList: CategoryChildren[] = [];//מערך הקטגוריות לתצוגה
  children1: CategoryChildren;
  CategoryOption: Observable<CategoryChildren[]>;

  constructor(private _formBuilder: FormBuilder, private categoryService: CategoryserviceService) {
    this.categoryService.GetAllParentCategory().subscribe((data: Category[]) => {
      this.ParentCategory = data;
      this.categoryService.GetSubCategoryToAoutoComplete().subscribe((data: Category[]) => {
        this.ChildrenCategory = data;
        this.createCategory();//הפעלה סינכרונית

      });
    });
    this.CategoryOption = this.stateForm.get('CategoryChildren')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCategory(value))
      );

  }
  ngOnInit() {



  }

  ngOnChanges() {
    if (this.value != null) {
      this.selectText = this.value;
      this.onselectedOption();
    }
  }
  private _filterCategory(value: string): CategoryChildren[] {
    this.selectedCategory = null;
    if (value) {
      return this.categoryList
        .map(cat => ({ NameParent: cat.NameParent, Children: _filter(cat.Children, value) }))
        .filter(cat => cat.Children.length > 0);
    }
    return this.categoryList;
  }

  createCategory() {
    for (let i = 0; i < this.ParentCategory.length; i++) {
      this.children1 = new CategoryChildren();
      this.children1.NameParent = this.ParentCategory[i].NameCategory;
      this.children1.Children.push(this.ParentCategory[i]);
      for (let j = 0; j < this.ChildrenCategory.length; j++) {
        if (this.ChildrenCategory[j].IdParentCategory == this.ParentCategory[i].IdCategory) {
          this.children1.Children.push(this.ChildrenCategory[j]);
        }
      }
      this.categoryList.push(this.children1);
      this.children1 = null;
    }
  }

  onselectedOption(event: any = { option: { value: this.value } }) {
    console.log(event.option.value);
    let value = event.option.value;
    let category;
    category = this.ParentCategory.filter(p => p.NameCategory == value);
    if (category.length == 0) {
      category = this.ChildrenCategory.filter(p => p.NameCategory == value);
    }
    console.log(event);
    this.selectedCategory = category[0];
    this.CategorySelected.emit(category[0]);
  }
  public valueMapper = (key) => {
    console.log(key);
    return key;
  };
  focusCategory(s:string)
  {
    this.focuscategory.emit(s);
  }

}
