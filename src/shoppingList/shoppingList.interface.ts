export interface CreateListProps {
  name: string;
  createdAt: string;
}

export interface ItemProps {
  _id?: string;
  name: string;
  quantity: string;
  checked: boolean;
}

export interface ShoppingList {
  id?: string;
  name: string;
  items: ItemProps[];
  createdAt: string;
}
