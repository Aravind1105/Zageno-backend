import express from "express";
import { Routes } from "../common/common.routes";
import ShoppingListMiddleware from "./shoppingList.middleware";
import ShoppingListController from "./shoppingList.controller";

export class ShoppingList extends Routes {
  constructor(app: express.Application) {
    super(app, "ShoppingList Route");
  }

  configureRoutes() {
    this.app.route("/api/getAllLists").get(ShoppingListController.getAllLists);

    this.app
      .route("/api/list/:listId")
      .all(ShoppingListMiddleware.validateListById)
      .get(ShoppingListController.getListById);

    this.app
      .route("/api/createList")
      .all(ShoppingListMiddleware.validateRequiredListFields)
      .post(ShoppingListController.createList);

    this.app
      .route("/api/addItem/:listId")
      .all(
        ShoppingListMiddleware.validateListById,
        ShoppingListMiddleware.validateRequiredItemFields
      )
      .post(ShoppingListController.addItem);

    this.app
      .route("/api/updateItem/:listId")
      .all(
        ShoppingListMiddleware.validateListById,
        ShoppingListMiddleware.validateRequiredItemFields
      )
      .put(ShoppingListController.updateItem);

    this.app
      .route("/api/deleteItem/:listId/:itemId")
      .all(
        ShoppingListMiddleware.validateListById,
        ShoppingListMiddleware.validateListItemById
      )
      .delete(ShoppingListController.deleteItem);

    return this.app;
  }
}
