import { create } from '../inventoryItem'

const DEFAULT_NUMBER_OF_ITEMS_IN_INVENTORY = 15;

export const createInventoryItemFactory = (repository) => (command, callback) => {
	const inventoryItem = create(command.inventoryItemId, command.name);
	inventoryItem.checkIn(DEFAULT_NUMBER_OF_ITEMS_IN_INVENTORY);

	repository.save(inventoryItem, callback);
}
