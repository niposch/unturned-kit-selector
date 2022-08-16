import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../models/Item";
import {ItemService} from "../../../services/item.service";
import {MatTableDataSource} from "@angular/material/table";
import {KitItem} from "../../../models/kits/KitItem";

@Component({
  selector: 'app-kit-item-select',
  templateUrl: './kit-item-select.component.html',
  styleUrls: ['./kit-item-select.component.scss']
})
export class KitItemSelectComponent implements OnInit {
  @Input() item: KitItem| undefined = undefined;
  @Output() itemChange = new EventEmitter<KitItem>();
  allItems : Array<Item> = []
  filteredItems: Array<Item> = [];

  constructor(private readonly itemService: ItemService) { }


  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.allItems = JSON.parse(JSON.stringify(items));
      this.filteredItems = this.allItems;
    });
  }

  onItemSearchKey(value: any) {
    console.log(value.value)
    this.filteredItems = this.allItems.filter(item => item.name.toLowerCase().includes(value.value.toLowerCase()));
  }
}
