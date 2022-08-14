import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private readonly snackBar:MatSnackBar) { }
  copyToClipboard(value: string) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = value;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.snackBar.open("Copied to clipboard", "", {duration: 2000});
  }
}
