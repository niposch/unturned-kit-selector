import { Component, OnInit } from '@angular/core';
import {KitLocalStorageService} from "../../../services/kit-local-storage.service";
import {Kit} from "../../../models/kits/Kit";
import {create} from "xmlbuilder"
import {ClipboardService} from "../../../clipboard.service";
import * as xmlbuilder from 'xmlbuilder';
@Component({
  selector: 'app-kit-export',
  templateUrl: './kit-export.component.html',
  styleUrls: ['./kit-export.component.scss']
})
export class KitExportComponent implements OnInit {
  kitXml: string;

  constructor(private readonly kitService:KitLocalStorageService, readonly clipboardService:ClipboardService) { }

  ngOnInit(): void {
    this.exportKits();
  }

  exportKits(){
    let kits = this.kitService.loadAllKits();
    let builder = create("KitsConfiguration").ele("Kits")

    for(var kit of kits){
      builder = builder.node("Kit")
        .ele("Name", kit.Name).up()
        .ele("XP", kit.XP).up()
        .ele("Money", kit.Money).up()
        .ele("Vehicle", kit.Vehicle).up();

      builder = this.addItems(kit, builder);
      builder = this.addSkills(kit, builder);

      builder = builder.ele("Cooldown", kit.Cooldown).up().up();
    }

    this.kitXml = builder.end({pretty: true, newline: "\n"})
  }

  addItems(kit:Kit, builder:xmlbuilder.XMLElement):xmlbuilder.XMLElement {
    if(kit.Items == null || kit.Items.length == 0){
      builder = builder.ele("Items" ).up();
      return builder;
    }
    builder = builder.ele("Items" );
    for(var item of kit.Items){
      builder = builder.ele("Item", {"id": item.item_id, "amount": item.amount}).up()
    }
    builder = builder.up();
    return builder
  }

  addSkills(kit: Kit, builder: xmlbuilder.XMLElement):xmlbuilder.XMLElement {
    if(kit.Skills == null || kit.Skills.length == 0){
      builder = builder.ele("Skills" ).up();
      return builder;
    }
    builder = builder.ele("Skills" );
    for(var skill of kit.Skills){
      builder = builder.ele("Skill", {"skillName": skill.name, "level": skill.targetLevel, "overrideSkillLevel": skill.overridePlayerLevel}).up()
    }
    builder = builder.up();
    return builder
  }

  private createExportObject(kits: Array<Kit>):ExportObject {
    let exportObject:ExportObject = {
      Kits: kits.map(kit => {return {Name:kit.Name, XP:kit.XP}})
    }
    return exportObject
  }
}

interface ExportKit {
  Name:string,
  XP:number
}

interface ExportObject{
  Kits:Array<ExportKit>;
}
