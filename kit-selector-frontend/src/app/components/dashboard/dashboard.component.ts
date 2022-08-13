import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/Item";
import {Observable} from "rxjs";
import {SearchSelector} from "../../models/SearchSelector";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Array<Item>|undefined;
  selectorObservable: Observable<SearchSelector>;

  constructor(private readonly itemService:ItemService) {
  }
  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

}
