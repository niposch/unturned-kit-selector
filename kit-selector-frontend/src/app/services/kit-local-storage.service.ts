import { Injectable } from '@angular/core';
import {Kit} from "../models/kits/Kit";
import {v4 as uuidv4} from 'uuid';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitLocalStorageService {

  private kitChange:Subscriber<Array<Kit>> | undefined;
  private kitObservable: Observable<Array<Kit>>  = new Observable<Array<Kit>>(observer => {
    this.kitChange = observer;
  });

  private kitsCache: Array<Kit> | undefined = undefined;
  constructor() { }

  loadAllKits(forceReload:boolean = false): Array<Kit> {
    if(this.kitsCache != undefined && !forceReload){
      this.kitChange?.next(this.kitsCache)
      return this.kitsCache;
    }

    let kitsJson = localStorage.getItem("kits");
    if(kitsJson == null){
      this.kitsCache = [];
      this.kitChange?.next([])
      return [];
    }
    let kits = JSON.parse(kitsJson);
    this.kitsCache = kits;
    this.kitChange?.next(kits);
    return [...kits];
  }


  getKitObservable(): Observable<Array<Kit>> {
    return this.kitObservable;
  }

  saveAllKits(kits: Array<Kit>): void {
    let usedNames = new Set<string>();
    let acceptedKits:Array<Kit> = []
    for (const kit of kits) {
      if(usedNames.has(kit.Name)){
        continue;
      }
      usedNames.add(kit.Name);
      acceptedKits.push(kit);
    }
    localStorage.setItem("kits", JSON.stringify(acceptedKits));
    this.loadAllKits(true);
  }

  createKit(kit: Kit): void {
    let kits = this.loadAllKits();
    if(kits.find(k => k.Name == kit.Name) != undefined){
      throw Error("Kit with name " + kit.Name + " already exists");
    }
    kit.websiteKitId = uuidv4();
    kits.push(kit);
    this.saveAllKits(kits);
    this.loadAllKits(true);
  }

  updateKit(kit: Kit): void {
    let kits = this.loadAllKits();
    let index = kits.findIndex(k => k.websiteKitId == kit.websiteKitId);
    kits[index] = kit;
    this.saveAllKits(kits);
    this.loadAllKits(true);
  }

  getKit(kitId:string):Kit|null {
    let kits = this.loadAllKits();
    return kits.find(k => k.websiteKitId == kitId) ?? null;
  }

  deleteKit(kit: Kit): void {
    let kits = this.loadAllKits();
    let index = kits.findIndex(k => k.websiteKitId == kit.websiteKitId);
    kits.splice(index, 1);
    this.saveAllKits(kits);
    this.loadAllKits(true);
  }
}
