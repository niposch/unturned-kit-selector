import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helper/Constants';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss']
})
export class NavItemsComponent implements OnInit {
  Constants = Constants;

  loggedIn = false

  constructor(private readonly auth:AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe(newUser => this.loggedIn = newUser != null)
  }

}
