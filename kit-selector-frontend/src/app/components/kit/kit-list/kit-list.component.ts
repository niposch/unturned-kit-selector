import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {Kit} from "../../../models/kits/Kit";
import {KitLocalStorageService} from "../../../services/kit-local-storage.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ClipboardService} from "../../../clipboard.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-kit-list',
  templateUrl: './kit-list.component.html',
  styleUrls: ['./kit-list.component.scss']
})
export class KitListComponent implements OnInit {
  displayedColumns: Array<string> = ["kit-name", "kit-items", "actions"];
  kits: MatTableDataSource<Kit> = new MatTableDataSource<Kit>();
  @ViewChild('table') table: MatTable<Kit>;

  constructor(private readonly kitService: KitLocalStorageService, readonly clipboardService:ClipboardService) { }

  ngOnInit(): void {
    this.kits.data = this.kitService.loadAllKits();
    this.kitService.getKitObservable().subscribe(kits => {
      this.kits.data = kits;
    })
  }

  onListDrop(event: CdkDragDrop<MatTableDataSource<Kit>, any>) {
    console.log(event);
    moveItemInArray(this.kits.data, event.previousIndex, event.currentIndex);
    this.kitService.saveAllKits(this.kits.data);
    this.table.renderRows();
  }

  deleteKit(kit:Kit) {
    this.kitService.deleteKit(kit);
  }
}
