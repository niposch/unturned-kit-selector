from __future__ import annotations

class Item:
    horizontal_slots:int
    vertical_slots:int
    item_id:int
    weight: float
    type: str
    rarity: str
    name: str
    description:str
    thumbnail_url: str
    additional_storage_vertical: int
    additional_storage_horizontal: int

    def __init__(self, horizontal_slots:int, vertical_slots:int, item_id:int, weight:float, type:str, rarity:str, name:str, description:str, thumbnail_url:str):
        self.horizontal_slots = horizontal_slots
        self.vertical_slots = vertical_slots
        self.item_id = item_id
        self.weight = weight
        self.type = type
        self.rarity = rarity
        self.name = name
        self.description = description
        self.thumbnail_url = thumbnail_url
