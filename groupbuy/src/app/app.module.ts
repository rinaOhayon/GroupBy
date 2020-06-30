import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { NgxPayPalModule } from 'ngx-paypal';

import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './component/criterions/category/category.component';
import { RegisterComponent } from './component/user/register/register.component';
import { CategoryserviceService } from './services/categoryservice.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './component/user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatButtonModule,

  MatInputModule,
  MatRippleModule,
  MatDialogRef,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GroupCreateComponent } from './component/groups/groups/group-create/group-create.component';
import { CriterionCreateComponent } from './component/criterions/criterion-create/criterion-create.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { MyexamplesComponent } from './component/myexamples/myexamples.component';
import { GroupComponent } from './component/groups/groups/group/group.component';

import { SubscribeCreateComponent } from './component/subscribe/subscribe-create/subscribe-create.component';
import { GroupDetailsComponent } from './component/groups/groups/group-details/group-details.component';
import { MatDialogModule } from "@angular/material/dialog";
import { GroupRegisterComponent } from './component/groups/registers/group-register/group-register.component';
import { GroupUpdateRegisterComponent } from './component/groups/registers/group-update-register/group-update-register.component';
import { SubscribeUpdateComponent } from './component/subscribe/subscribe-update/subscribe-update.component';
import { SubscribeViewComponent } from './component/subscribe/subscribe-view/subscribe-view.component';
import { SearchComponent } from './component/search/search.component';
import { GroupRegisterViewComponent } from './component/groups/registers/group-register-view/group-register-view.component';
import { SelectCategoryComponent } from './component/criterions/select-category/select-category.component';
import { GroupUpdateComponent } from './component/groups/groups/group-update/group-update.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { PerformanceComponent } from './component/user/performance/performance.component';
import { ConfirmRegisterComponent } from './component/user/confirm-register/confirm-register.component';
import { AutoGuardGuard } from './app-routing/auto-guard.guard';
import { HeaderComponent } from './component/style/header/header.component';
import { FooterComponent } from './component/style/footer/footer.component';
import { LeftSectionComponent } from './component/style/left-section/left-section.component';
import { RightSectionComponent } from './component/style/right-section/right-section.component';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { BasketComponent } from './component/groups/groups/basket/basket.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { ChatGroupComponent } from './component/groups/registers/chat-group/chat-group.component';
import { SubscribeViewTableComponent } from './component/subscribe/subscribe-view-table/subscribe-view-table.component';
import { GroupDeleteComponent } from './component/groups/groups/group-delete/group-delete.component';
import { GroupClosedCreatedComponent } from './component/groups/groups/group-closed-created/group-closed-created.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CategoryComponent,
    LoginComponent,
    GroupCreateComponent,
    CriterionCreateComponent,
    HomeComponent,
    MyexamplesComponent,
    GroupComponent,
    SubscribeCreateComponent,
    GroupDetailsComponent,
    GroupRegisterComponent,
    GroupUpdateRegisterComponent,
    SubscribeUpdateComponent,
    SubscribeViewComponent,
    SearchComponent,
    GroupRegisterViewComponent,
    SelectCategoryComponent,
    GroupUpdateComponent,
    PerformanceComponent,
    ConfirmRegisterComponent,
    HeaderComponent,
    FooterComponent,
    LeftSectionComponent,
    RightSectionComponent,
    BasketComponent,
    ChatGroupComponent,
    SubscribeViewTableComponent,
    GroupDeleteComponent,
    GroupClosedCreatedComponent

  ],
  imports: [FormsModule,
    BrowserModule, HttpClientModule, CommonModule, BrowserAnimationsModule, MatButtonModule, AppRoutingModule, MatAutocompleteModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    NgxPayPalModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatBadgeModule


  ],
  providers: [DatePipe, CategoryserviceService, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, GroupRegisterComponent, GroupUpdateRegisterComponent, LoginComponent],
  exports: [RegisterComponent]
})
export class AppModule { }


