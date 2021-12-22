import { Repository } from "../inventoryItem";

import { checkInItemsInToInventoryFactory } from "./check-in-items-in-inventory";
import { checkOutItemsFromInventoryFactory } from "./check-out-items-from-inventory";
import { createInventoryItemFactory } from "./create-inventory-item";
import { deactivateInventoryItemFactory } from "./deactivate-inventory-item";
import { renameInventoryItemFactory } from "./rename-inventory-item";

const repository = new Repository();

export const createInventoryItem = createInventoryItemFactory(repository)
export const renameInventoryItem = renameInventoryItemFactory(repository)
export const checkInItemsInToInventory = checkInItemsInToInventoryFactory(repository)
export const checkOutItemsFromInventory = checkOutItemsFromInventoryFactory(repository)
export const deactivateInventoryItem = deactivateInventoryItemFactory(repository)
