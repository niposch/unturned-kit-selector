import {Item} from "./Item";

export interface SearchSelector{
  search(items: Array<Item>): Array<Item>;
  searchString: string;
  selectedRarities: string[];
  selectedTypes: string[];
}
