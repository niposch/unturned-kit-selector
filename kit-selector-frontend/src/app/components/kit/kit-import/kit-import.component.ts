import {Component, OnInit, ViewChild} from '@angular/core';
import {Kit} from "../../../models/kits/Kit";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Skill} from "../../../models/Skill";
import {Item} from "../../../models/Item";
import {ItemService} from "../../../services/item.service";
import {KitLocalStorageService} from "../../../services/kit-local-storage.service";
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-kit-import',
  templateUrl: './kit-import.component.html',
  styleUrls: ['./kit-import.component.scss']
})
export class KitImportComponent implements OnInit {

  @ViewChild("xmlInput") textArea: HTMLTextAreaElement;
  constructor(private readonly snackbarService:MatSnackBar, private readonly itemService:ItemService, private readonly kitService:KitLocalStorageService) { }

  ngOnInit(): void {
  }

  parsedCache: Array<Kit> | undefined | null = undefined;

  loadParsedResults(){
    if(this.parsedCache == null){
      this.snackbarService.open("No valid xml provided. Kits can't be imported! ", "Close", {duration: 4000});
      return;
    }
    for (const kit of this.parsedCache) {
      kit.websiteKitId = uuidv4();
    }
    this.kitService.saveAllKits(this.parsedCache);
    this.snackbarService.open("Kits imported!", "Close", {duration: 4000});
  }
  async parseXml(event:Event) {
    let xml = (<HTMLTextAreaElement>event.target).value;
    const parser = new XMLParser({ignoreAttributes: false,
      attributeNamePrefix : "@_",});
    const parseResult = parser.parse(xml);
    let kits:Array<Kit>;

    try {
      let res = parseResult.KitsConfiguration.Kits.Kit;
      for (let i = 0; i < res.length; i++) {
        res[i].Items = await this.parseItems(res[i].Items);
        res[i].Skills = this.parseSkills(res[i].Skills);
      }
      kits = res;

    }
    catch (e) {
      console.log(e);
      this.snackbarService.open("Error parsing XML", "Close", {duration: 2000});
      this.parsedCache = null;
      return;
    }
    console.log(kits);

    this.parsedCache = kits;
  }

  async parseItems(items:any | string): Promise<Array<Item>> {
    if(items == "" || items == undefined){
      return [];
    }
    let itemList = await this.itemService.getItems().toPromise();
    if(itemList == null){
      return [];
    }
    let parsedItems = []
    for(let j = 0; j<items.Item.length; j++){
      try {
        let item = items.Item[j];
        let itemId = parseInt(item["@_id"])
        let foundItem = itemList.find(item => item.item_id == itemId)
        if(foundItem == undefined){
          continue
        }
        parsedItems.push(foundItem);
      }
      catch (e) {
        console.log(e);
        continue
      }
    }
    return parsedItems;
  }

  parseSkills(skills:any | string){
    if(skills == "" || skills == undefined){
      return [];
    }
    let parsedSkills = []
    for(let j = 0; j<skills.Skill.length; j++){
      try {
        let skill = skills.Skill[j];
        let skillObj:Skill = {
          name: skill["@_skillName"],
          targetLevel: parseInt(skill["@_level"]),
          overridePlayerLevel: skill["@_overrideSkillLevel"].toLowerCase() == "true" ? true : false,
        }
        parsedSkills.push(skillObj);
      }
      catch (e) {
        console.log(e);
        continue
      }
    }
    return parsedSkills;
  }

}
