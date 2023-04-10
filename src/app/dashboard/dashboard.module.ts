import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { ModalComponent } from '../components/modal/modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    DashboardHomeComponent,
    PrivilegesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
