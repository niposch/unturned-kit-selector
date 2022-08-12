import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../models/Item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input()
  public items: Array<Item> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
