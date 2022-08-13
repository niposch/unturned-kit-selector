import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemDetailsComponent} from "./components/item/item-details/item-details.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:"details", component:ItemDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
