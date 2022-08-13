import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RarityColorServiceService {

  constructor() { }

  getFontColorClass(rarity: string): string {
    switch (rarity) {
      case 'Uncommon':
        return 'text-rarity-uncommon';
      case 'Rare':
        return 'text-rarity-rare';
      case 'Epic':
        return 'text-rarity-epic';
      case 'Legendary':
        return 'text-rarity-legendary';
      case 'Mythical':
        return 'text-rarity-mythical';
      default:
        return 'text-rarity-common';
    }
  }
}
