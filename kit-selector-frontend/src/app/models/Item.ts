import {Skill} from "./Skill";

export interface Item {
  horizontal_slots: number;
  vertical_slots: number;
  item_id: number;
  weight: number;
  type: string;
  rarity: string;
  name: string;
  description: string;
  thumbnail_url: string;
  additional_storage_vertical: number;
  additional_storage_horizontal: number;
  skills: Array<Skill>;
}
