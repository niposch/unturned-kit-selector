import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemDetailsComponent} from "./components/item/item-details/item-details.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {KitUpdateComponent} from "./components/kit/kit-update/kit-update.component";
import {KitListItemComponent} from "./components/kit/kit-list-item/kit-list-item.component";
import {KitDetailsComponent} from "./components/kit/kit-details/kit-details.component";
import {KitListComponent} from "./components/kit/kit-list/kit-list.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:"details", component:ItemDetailsComponent},
  {path: "kit",children:[
      {path:"details/:id", component:KitDetailsComponent},
      {path:"list", component:KitListComponent},
      {path: "create-update/:id", component:KitUpdateComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
