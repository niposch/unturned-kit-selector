import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {Item} from "../../../models/Item";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  itemId: number|null|undefined = undefined;
  item: Item|null|undefined = undefined;
  constructor(private readonly route:ActivatedRoute, private readonly itemService:ItemService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap =>{
      try {
        this.itemId = parseInt(paramMap.get('item-id') as string);
        this.itemService.getItems().subscribe(items => {
          try{
            let res = items.find(item => item.item_id === this.itemId);
            this.item = res ?? null;
          }
          catch (e) {
            console.log(e);
            console.log('Item not found');
            this.item = null;
          }

        })
      }
      catch (e) {
        console.log(e)
        this.itemId = null;
      }
    })
  }

}
