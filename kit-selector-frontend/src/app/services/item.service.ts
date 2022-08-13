import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {Item} from "../models/Item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private cache:Array<Item>|undefined;
  private runningRequest: Observable<Array<Item>> | null = null;
  constructor(private readonly http:HttpClient) { }

  getItems(): Observable<Item[]> {
    if (this.cache != undefined) {
      return new Observable<Item[]>(subscriber => {
        subscriber.next(this.cache);
        subscriber.complete();
      });
    }
    if(this.runningRequest) {
      return this.runningRequest;
    }
    var obs = this.http.get<Item[]>("assets/items.json");
    this.runningRequest = obs;
    obs.subscribe(items => {
      this.cache = items;
    });
    return obs;
  }
}
