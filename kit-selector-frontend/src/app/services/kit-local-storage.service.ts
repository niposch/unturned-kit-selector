import { Injectable } from '@angular/core';
import {Kit} from "../models/kits/Kit";
import {v4 as uuidv4} from 'uuid';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitLocalStorageService {

  private kitChange:Subscriber<Array<Kit>>;
  private kitObservable: Observable<Array<Kit>>  = new Observable<Array<Kit>>(observer => {
    this.kitChange = observer;
  });

  private kitsCache: Array<Kit> | undefined = undefined;
  constructor() { }

  loadAllKits(): Array<Kit> {
    if(this.kitsCache != undefined){
      return this.kitsCache;
    }

    let kitsJson = localStorage.getItem("kits");
    if(kitsJson == null){
      this.kitsCache = [];
      this.kitChange.next([])
      return [];
    }
    let kits = JSON.parse(kitsJson);
    this.kitsCache = kits;
    this.kitChange.next(kits);
    return kits;
  }


  getKitObservable(): Observable<Array<Kit>> {
    return this.kitObservable;
  }

  saveAllKits(kits: Array<Kit>): void {
    localStorage.setItem("kits", JSON.stringify(kits));
    this.loadAllKits();
  }

  createKit(kit: Kit): void {
    let kits = this.loadAllKits();
    kit.websiteKitId = uuidv4();
    kits.push(kit);
    this.saveAllKits(kits);
    this.loadAllKits();
  }

  updateKit(kit: Kit): void {
    let kits = this.loadAllKits();
    let index = kits.findIndex(k => k.websiteKitId == kit.websiteKitId);
    kits[index] = kit;
    this.saveAllKits(kits);
    this.loadAllKits();
  }
}