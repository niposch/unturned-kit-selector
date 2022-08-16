import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { ItemListComponent } from './components/item/item-list/item-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TableVirtualScrollModule} from "ng-table-virtual-scroll";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { SearchInputComponent } from './components/item/search-input/search-input.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import { ItemDetailsComponent } from './components/item/item-details/item-details.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import { NavItemsComponent } from './components/nav/nav-items/nav-items.component';
import { KitListComponent } from './components/kit/kit-list/kit-list.component';
import { KitUpdateComponent } from './components/kit/kit-update/kit-update.component';
import { KitImportComponent } from './components/kit/kit-import/kit-import.component';
import { KitExportComponent } from './components/kit/kit-export/kit-export.component';
import { KitListItemComponent } from './components/kit/kit-list-item/kit-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    SearchInputComponent,
    ItemDetailsComponent,
    DashboardComponent,
    NavItemsComponent,
    KitListComponent,
    KitUpdateComponent,
    KitImportComponent,
    KitExportComponent,
    KitListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    ScrollingModule,
    TableVirtualScrollModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
