import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  c: Category[];
  ParentCategory: Category[] = [];
  SubCategory: Category[] = [];
  idCategory;
  idSubCategory;
  subcategory: Category[];
  c1: Category = new Category();
  @Input() clear;
  @Output() ParentCategoryChoose = new EventEmitter<Category>();
  @Output() SubCategoryChoose = new EventEmitter<Category>();
  constructor(private categoryService: CategoryserviceService) { }
  ngOnInit() {
    this.categoryService.GetAllParentCategory().subscribe((data: Category[]) => {
      this.c = this.ListCategory(data);
    });
  }

  ngOnChanges() {
    if (this.clear) {
      this.idCategory = 0;
      this.subcategory = null;
    }
  }
  ListCategory(category: Category[]): Category[] {
    this.c1.IdCategory = 0;
    this.c1.IdParentCategory = 0;
    this.c1.IdTypeGroup = 0;
    this.c1.NameCategory = "";
    let categoryAll: Category[] = [];
    categoryAll.push(this.c1);
    categoryAll.push(...category);
    return categoryAll;
  }
  ChooseCategory() {
    if (this.idCategory != 0) {
      this.categoryService.GetSubCategory(this.idCategory).subscribe((data: Category[]) => {
        this.subcategory = this.ListCategory(data);
      }),
        error => {
       
        };
    }
    else {
      this.subcategory = null;
      this.idCategory="";
    }
    this.ParentCategoryChoose.emit(this.c.find(p => p.IdCategory == this.idCategory));
  }
  ChooseSubCategory() {
    if(this.idSubCategory==0)
    this.idSubCategory="";
    this.SubCategoryChoose.emit(this.subcategory.find(p => p.IdCategory == this.idSubCategory));
  }
}

