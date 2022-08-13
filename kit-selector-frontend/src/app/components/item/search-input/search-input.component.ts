import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ItemRarityService} from "../../../services/item-rarity.service";
import {ItemTypeService} from "../../../services/item-type.service";
import {SearchSelector} from "../../../models/SearchSelector";
import {Item} from "../../../models/Item";
import {Observable, Subscriber} from "rxjs";
import {search, Searcher} from "fast-fuzzy";
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Output() search = new EventEmitter<Observable<SearchSelector>>();
  searchSelectorObservable = new Observable<SearchSelector>(observer => {
    this.searchSubscriber = observer;
  })
  searchSelector:SearchSelector = this.createSearchSelector();
  searchSubscriber:Subscriber<SearchSelector>;

  searchString: string;
  selectedRarities: string[] = [];
  selectedTypes: string[] = [];

  allRarities: Array<string> = [];
  allTypes: Array<string> = [];
  constructor(private readonly rarityService: ItemRarityService, private readonly typeService:ItemTypeService) {
  }

  ngOnInit(): void {
    this.rarityService.getAllRarities().then(rarities => {
      this.allRarities = [...this.allRarities, ...rarities];
    })
    this.typeService.getAllTypes().then(types => {
      this.allTypes = [...this.allTypes, ...types];
    });
    this.search.emit(this.searchSelectorObservable);
  }
  createSearchSelector():SearchSelector{
    let selector:SearchSelector = {
      searchString: "",
      selectedRarities: [],
      selectedTypes: [],

      search(items: Array<Item>): Array<Item> {
        items = items.filter(item => {
          if(this.selectedTypes.length > 0 && !this.selectedTypes.includes(item.type)){
            return false;
          }
          if(this.selectedRarities.length > 0 && !this.selectedRarities.includes(item.rarity)){
            return false;
          }
          return true;
        })
        if(this.searchString == undefined || this.searchString == ""){
          return items;
        }

        interface SearchItem {
          searchString:string
          data:Item
        }
        let searchItems:Array<SearchItem> = items.map<SearchItem>(i => {
          return {searchString: i.item_id + i.name + i.rarity + i.type + i.thumbnail_url, data: i}
        })
        let results = search(this.searchString, searchItems, {keySelector: item => item.searchString, threshold: 0.6})
        if(results == undefined){
          return items;
        }
        let matchingIds = results.filter(result => result.data.item_id.toString() == this.searchString);
        if(matchingIds.length > 0){
          results.splice(results.indexOf(matchingIds[0]), 1);
          results = [matchingIds[0], ...results]
        }
        return results.map(result => result.data)
      }
    }
    return selector;
  }

  onTypesChange(event: any) {
    this.searchSelector.selectedTypes = event
    this.searchSubscriber?.next(this.searchSelector);
  }

  onRaritiesChange(event: any) {
    this.searchSelector.selectedRarities = event
    this.searchSubscriber?.next(this.searchSelector);
  }

  onSearchStringChange(event: any) {
    this.searchSelector.searchString = event
    this.searchSubscriber?.next(this.searchSelector);
  }
}
