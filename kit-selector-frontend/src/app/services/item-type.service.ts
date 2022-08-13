import { Injectable } from '@angular/core';
import {ItemService} from "./item.service";

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  constructor(private readonly itemService:ItemService) { }
  private rarityCache: Array<string> | undefined;
  public async getAllTypes(): Promise<string[]> {
    if(!this.rarityCache)
      this.rarityCache = await this.findAllTypes();
    return this.rarityCache;
  }

  private async findAllTypes(): Promise<string[]> {
    var allItems = await this.itemService.getItems().toPromise();
    var rarities = new Set<string>();
    if(allItems == undefined){
      console.log("allItems is undefined");
      return []
    }
    allItems.forEach(item => {
      rarities.add(item.type);
    })
    return Array.from(rarities);
  }
}
