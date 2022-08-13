import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Item} from "../../../models/Item";
import {DataSource} from "@angular/cdk/collections";
import {RarityColorServiceService} from "../../../services/rarity-color-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {SearchSelector} from "../../../models/SearchSelector";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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

  @Input()
  public searchSelectorObservable: Observable<SearchSelector>|undefined;

  public dataSource = new TableVirtualScrollDataSource<Item>();
  displayedColumns = ["item-id", "image", "name", "item-type"];
  isLoading = true;

  constructor(readonly rarityService: RarityColorServiceService, private readonly snackBar:MatSnackBar, private readonly router:Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].currentValue) {
      this.dataSource.data = changes['items'].currentValue;
      console.log(this.dataSource);
      this.isLoading = false;
    }
    else{
      this.dataSource.data = [];
      this.isLoading = true;
    }
    this.updateOperationsDisplay(changes["displayOperations"]?.currentValue ?? this.displayOperations);
    this.handleSearchSelectorChange(changes);
  }

  private handleSearchSelectorChange(changes:SimpleChanges){
    if(changes["searchSelectorObservable"] != null){
      this.searchSelectorObservable = changes["searchSelectorObservable"].currentValue;
      this.subscribeToSearchObservable()
    }
  }
  subscribeToSearchObservable(){
    this.searchSelectorObservable?.subscribe(searchSelector => {
      if(this.items == null)
        return
      this.dataSource.data = searchSelector.search(this.items)
    })
  }

  private updateOperationsDisplay(newState:boolean){

    if(newState == true ){
      if(this.displayedColumns.indexOf("operations") == -1)
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

  openItemDetails(item_id:number){
    this.router.navigate(["/details"], {queryParams: {"item-id": item_id}})
  }
}
