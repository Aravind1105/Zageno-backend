import mongoose from "mongoose";

import model from "./shoppingList.schema";
import {
  CreateListProps,
  ItemProps,
  ShoppingList,
} from "./shoppingList.interface";

class ShoppingListService {
  private readonly model;

  constructor(model: any) {
    this.model = model;
  }

  getAllLists(): Promise<ShoppingList[]> {
    return this.model.find({}).exec();
  }

  getListById(listId: string): Promise<ShoppingList> {
    return this.model.findById(listId);
  }

  createList(listDto: CreateListProps): Promise<ShoppingList> {
    return this.model.create(listDto);
  }

  async addItem(listId: string, itemDto: ItemProps): Promise<ShoppingList> {
    const list = await this.model.findById(listId);
    list.items.push(itemDto);
    await list.save();
    return list;
  }

  async updateCheckedItem(
    listId: string,
    itemDto: ItemProps
  ): Promise<ShoppingList> {
    const list = await this.model.findById(listId);
    const item = list.items.find(
      (item: ItemProps) => item._id?.toString() == itemDto._id
    );
    item.checked = itemDto.checked;
    await list.save();
    return list;
  }

  async deleteItem(listId: string, itemId: string): Promise<ShoppingList> {
    const list = await this.model.findById(listId);
    const items = list.items.filter(
      (item: ItemProps) => item._id?.toString() !== itemId
    );
    list.items = items;
    await list.save();
    return list;
  }
}

export default new ShoppingListService(model);
