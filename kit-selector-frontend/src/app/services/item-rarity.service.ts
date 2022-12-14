import { Injectable } from '@angular/core';
import {ItemService} from "./item.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemRarityService {

  constructor(private readonly itemService: ItemService) { }

  private rarityCache: Array<string> | undefined;
  public async getAllRarities(): Promise<string[]> {
    if(!this.rarityCache)
      this.rarityCache = await this.findAllRarities();
    return this.rarityCache;
  }

  private async findAllRarities(): Promise<string[]> {
    var allItems = await this.itemService.getItems().toPromise();
    var rarities = new Set<string>(["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical"]);
    if(allItems == undefined){
      console.log("allItems is undefined");
      return []
    }
    allItems.forEach(item => {
      rarities.add(item.rarity);
    })
    return Array.from(rarities);
  }
}
