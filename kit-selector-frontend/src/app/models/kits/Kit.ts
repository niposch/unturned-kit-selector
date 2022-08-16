import {KitItem} from "./KitItem";

export class Kit{
  websiteKitId: string;
  Name:string
  XP: number
  Money: number
  Vehicle: number
  Items:Array<KitItem>
  Cooldown: number
}
