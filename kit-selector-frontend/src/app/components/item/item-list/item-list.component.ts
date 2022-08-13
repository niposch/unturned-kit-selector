import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Item} from "../../../models/Item";
import {DataSource} from "@angular/cdk/collections";
import {RarityColorServiceService} from "../../../services/rarity-color-service.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnChanges{
  @Input()
  public items: Array<Item>|undefined;

  public dataSource: Array<Item> = [];
  displayedColumns = ["item-id", "image", "name", "item-type"];
  isLoading = true;

  constructor(readonly rarityService: RarityColorServiceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].currentValue) {
      this.dataSource = changes['items'].currentValue;
      console.log(this.dataSource);
      this.isLoading = false;
    }
    else{
      this.dataSource = [];
      this.isLoading = true;
    }
  }

}
