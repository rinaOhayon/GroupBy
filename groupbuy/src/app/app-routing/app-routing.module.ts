// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupCreateComponent } from '../component/groups/groups/group-create/group-create.component';
import { LoginComponent } from '../component/user/login/login.component';
import { RegisterComponent } from '../component/user/register/register.component';
import { HomeComponent } from '../component/home/home.component';
import { GroupComponent } from '../component/groups/groups/group/group.component';
import { GroupDetailsComponent } from '../component/groups/groups/group-details/group-details.component';
import { SubscribeCreateComponent } from '../component/subscribe/subscribe-create/subscribe-create.component';
import { SubscribeUpdateComponent } from '../component/subscribe/subscribe-update/subscribe-update.component';
import { SubscribeViewComponent } from '../component/subscribe/subscribe-view/subscribe-view.component';
import { GroupUpdateComponent } from '../component/groups/groups/group-update/group-update.component';
import { GroupRegisterViewComponent } from '../component/groups/registers/group-register-view/group-register-view.component';
import { PerformanceComponent } from '../component/user/performance/performance.component';
import { ConfirmRegisterComponent } from '../component/user/confirm-register/confirm-register.component';
import { AutoGuardGuard } from './auto-guard.guard';
import { BasketComponent } from '../component/groups/groups/basket/basket.component';
import { ChatGroupComponent } from '../component/groups/registers/chat-group/chat-group.component';
import { SubscribeViewTableComponent } from '../component/subscribe/subscribe-view-table/subscribe-view-table.component';
import { group } from '@angular/animations';
import { GroupDeleteComponent } from '../component/groups/groups/group-delete/group-delete.component';
import { GroupClosedCreatedComponent } from '../component/groups/groups/group-closed-created/group-closed-created.component';
const appRouting: Routes = [
  { path: '', component: HomeComponent },
  { path: 'group-create', component: GroupCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'group-view', component: GroupComponent },
  { path: 'details/:id', component: GroupDetailsComponent },
  { path: 'subscibe-create', component: SubscribeCreateComponent },
  { path: 'subscibe-update', component: SubscribeUpdateComponent },
  { path: 'subscibe-view', component: SubscribeViewComponent },
  { path: 'subscibe-view-table', component: SubscribeViewTableComponent },
  { path: 'group-update/:id/:view', component: GroupUpdateComponent,canActivate:[AutoGuardGuard] },
  { path: 'group-register-view/:id', component: GroupRegisterViewComponent },
  { path: 'group-delete/:idGroup/:idManager/:numRegister', component:GroupDeleteComponent },
  { path: 'performance', component: PerformanceComponent},
  { path: 'confirmRegister/:idUser', component: ConfirmRegisterComponent },
  {path:'basket',component:BasketComponent},
  {path:'ChatGroup/:idGroup/:ChatNotRead',component:ChatGroupComponent,canActivate:[AutoGuardGuard]},
  {path:'created-group',component:GroupClosedCreatedComponent},

  { path: '**', redirectTo: '/not-found' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRouting)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
