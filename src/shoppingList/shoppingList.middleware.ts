import express from "express";
import shoppingListService from "./shoppingList.service";
import { ItemProps } from "./shoppingList.interface";
class ShoppingListMiddleware {
  async validateListById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id: string = req.params.listId;
    const list = await shoppingListService.getListById(id);
    if (list) {
      next();
    } else {
      res.status(404).send({
        error: `List with id ${req.params.listId} not found`,
      });
    }
  }

  async validateListItemById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const listId: string = req.params.listId;
    const itemId: string = req.params.itemId;
    const list = await shoppingListService.getListById(listId);

    if (list.items.some((item: ItemProps) => item._id == itemId)) {
      next();
    } else {
      res.status(404).send({
        error: `Item with id ${req.params.listId} not found`,
      });
    }
  }

  async validateRequiredItemFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name && req.body.quantity) {
      next();
    } else {
      res.status(400).send({
        error: `Missing fields - all fields name, quantity, checked are required.`,
      });
    }
  }

  async validateRequiredListFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name && req.body.createdAt) {
      next();
    } else {
      res.status(400).send({
        error: `Missing fields - all fields name, createdAt are required.`,
      });
    }
  }
}
export default new ShoppingListMiddleware();
