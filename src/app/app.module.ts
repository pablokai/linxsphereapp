import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AdminModule} from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LayoutComponent ],
  imports: [
    CommonModule, AppRoutingModule, BrowserModule, AdminModule, HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}