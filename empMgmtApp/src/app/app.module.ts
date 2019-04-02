import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmpCreateComponent } from './emp-create/emp-create.component';
import { EmpReadComponent } from './emp-read/emp-read.component';
import { EmpUpdateComponent } from './emp-update/emp-update.component';
import { EmpDeleteComponent } from './emp-delete/emp-delete.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EmpCreateComponent,
    EmpReadComponent,
    EmpUpdateComponent,
    EmpDeleteComponent,
    EmpDetailsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
