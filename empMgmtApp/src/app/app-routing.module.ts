import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpCreateComponent } from './emp-create/emp-create.component';
import { EmpDeleteComponent } from './emp-delete/emp-delete.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpReadComponent } from './emp-read/emp-read.component';
import { EmpUpdateComponent } from './emp-update/emp-update.component';

const routes: Routes = [
{ 
  path: '', 
  redirectTo: '/emp-create', 
  pathMatch: 'full' 
},
{
  path: 'emp-create',
  component: EmpCreateComponent
},
{
  path: 'emp-delete',
  component: EmpDeleteComponent
},
{
  path: 'emp-details/:id',
  component: EmpDetailsComponent
},
{
  path: 'emp-read',
  component: EmpReadComponent
},
{
  path: 'emp-update',
  component: EmpUpdateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
