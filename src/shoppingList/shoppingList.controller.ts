import express from "express";
import {
  CreateListProps,
  ItemProps,
  ShoppingList,
} from "./shoppingList.interface";
import shoppingListService from "./shoppingList.service";

class ShoppingListController {
  async getAllLists(req: express.Request, res: express.Response) {
    const list: ShoppingList[] = await shoppingListService.getAllLists();
    res.status(201).json(list);
  }

  async getListById(req: express.Request, res: express.Response) {
    const listId: string = req.params.listId;
    const list: ShoppingList = await shoppingListService.getListById(listId);
    res.status(201).json(list);
  }

  async createList(req: express.Request, res: express.Response) {
    try {
      const listDto: CreateListProps = req.body;
      const list: ShoppingList = await shoppingListService.createList(listDto);
      res.status(201).json(list);
    } catch (error) {
      console.error(error);
      throw new Error("Cannot add the requested List");
    }
  }

  async addItem(req: express.Request, res: express.Response) {
    try {
      const itemDto: ItemProps = req.body;
      const listId: string = req.params.listId;
      const item: ShoppingList = await shoppingListService.addItem(
        listId,
        itemDto
      );
      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      throw new Error("Cannot add the requested Item");
    }
  }

  async updateItem(req: express.Request, res: express.Response) {
    try {
      const itemDto: ItemProps = req.body;
      const listId: string = req.params.listId;
      const item: ShoppingList = await shoppingListService.updateCheckedItem(
        listId,
        itemDto
      );
      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      throw new Error("Cannot update the requested Item");
    }
  }

  async deleteItem(req: express.Request, res: express.Response) {
    const listId: string = req.params.listId;
    const itemId: string = req.params.itemId;
    let status: string;
    try {
      const list = await shoppingListService.deleteItem(listId, itemId);
      res.status(200).json(list);
    } catch (error) {
      console.error(error);
      throw new Error("Cannot delete the requested Item");
    }
  }
}

export default new ShoppingListController();
