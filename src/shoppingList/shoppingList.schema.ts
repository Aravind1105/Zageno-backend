import mongoose from "mongoose";

const ItemProps = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  checked: { type: Boolean, required: true },
});

const ShoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: { type: [ItemProps] },
  createdAt: { type: String, required: true },
});

export default mongoose.model("ShoppingList", ShoppingListSchema);
