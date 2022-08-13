import {Component, OnInit} from '@angular/core';
import {Item} from "./models/Item";
import {ItemService} from "./services/item.service";
import {Observable} from "rxjs";
import {SearchSelector} from "./models/SearchSelector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kit-selector-frontend';
}
