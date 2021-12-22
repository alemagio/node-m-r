export const checkInItemsInToInventoryFactory = (repository) => (command, callback) => {
	repository.get(command.inventoryItemId, function(error, inventoryItem) {
		if(error) {
			callback(error);
			return;
		}

		inventoryItem.checkIn(command.numberOfItems);
		repository.save(inventoryItem, callback);
	});
};