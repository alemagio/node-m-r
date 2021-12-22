import { InventoryItem } from "./aggregate";
import { InventoryItemRepository } from "./repository"

function create(id, name) {
	return new InventoryItem(id, name);
}

export {
  InventoryItemRepository as Repository,
  create
}