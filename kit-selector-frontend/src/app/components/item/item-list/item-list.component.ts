import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Item} from "../../../models/Item";
import {DataSource} from "@angular/cdk/collections";
import {RarityColorServiceService} from "../../../services/rarity-color-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnChanges, OnInit{
  @Input()
  public items: Array<Item>|undefined;

  @Input()
  public displayOperations = true;

  public dataSource: Array<Item> = [];
  displayedColumns = ["item-id", "image", "name", "item-type"];
  isLoading = true;

  constructor(readonly rarityService: RarityColorServiceService, private readonly snackBar:MatSnackBar) { }

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
    this.updateOperationsDisplay(changes["displayOperations"]?.currentValue ?? this.displayOperations);
  }

  private updateOperationsDisplay(newState:boolean){
    if(newState == true && this.displayedColumns.indexOf("operations") == -1){
      this.displayedColumns.push("operations");
    }
    else{
      var opsIndex = this.displayedColumns.indexOf("operations");
      if (opsIndex > -1) {
        this.displayedColumns.splice(opsIndex, 1);
      }
    }
  }

  copyToClipboard(value: string) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = value;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.snackBar.open("Copied to clipboard", "", {duration: 2000});
  }

  ngOnInit(): void {
    this.updateOperationsDisplay(this.displayOperations);
  }
}
