import {KitItem} from "./KitItem";
import {Skill} from "../Skill";

export class Kit{
  websiteKitId: string;
  Name:string
  XP: number
  Money: number
  Vehicle: number
  Items:Array<KitItem>
  Cooldown: number
  Skills: Array<Skill>;
}
