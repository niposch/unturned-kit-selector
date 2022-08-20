import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helper/Constants';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss']
})
export class NavItemsComponent implements OnInit {
  Constants = Constants;

  constructor() { }

  ngOnInit(): void {
  }

}
