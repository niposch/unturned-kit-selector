import {Component, OnInit} from '@angular/core';
import {Item} from "./models/Item";
import {ItemService} from "./services/item.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kit-selector-frontend';
  items: Array<Item>|undefined;

  constructor(private readonly itemService:ItemService) {
  }
  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

}
