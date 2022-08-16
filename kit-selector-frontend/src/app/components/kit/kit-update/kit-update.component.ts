import {Component, OnInit} from '@angular/core';
import {Kit} from "../../../models/kits/Kit";
import {KitLocalStorageService} from "../../../services/kit-local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../helper/Constants";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-kit-update',
  templateUrl: './kit-update.component.html',
  styleUrls: ['./kit-update.component.scss']
})
export class KitUpdateComponent implements OnInit {

  kit: Kit | null | undefined = undefined;

  constructor(private readonly kitService: KitLocalStorageService, private readonly activatedRoute: ActivatedRoute, private readonly router: Router, private readonly snackbarService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      let kitId = url[url.length - 1].path;
      if (kitId == null || kitId == Constants.EmptyGuid) {
        this.kit = {websiteKitId: Constants.EmptyGuid, Name: "", Items: [], Vehicle:0, Money:0, Cooldown:0, XP:0 };
      } else {
        this.kit = JSON.parse(JSON.stringify(this.kitService.getKit(kitId)));
      }
    })
  }

  saveKit() {
    if (this.kit == null) {
      console.log('Kit is null');
      return;
    }
    if (this.kit?.websiteKitId == null || this.kit?.websiteKitId == Constants.EmptyGuid) {
      try {
        this.kitService.createKit(this.kit);
      } catch (e) {
        this.snackbarService.open("Error creating kit. Names have to be unique.", "Close", {'duration': 3000})
        return;
      }
    } else {
      this.kitService.updateKit(this.kit);
    }
    this.router.navigate(["/kit", "list"])
  }
}
