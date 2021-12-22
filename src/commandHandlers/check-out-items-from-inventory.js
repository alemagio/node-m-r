export const checkOutItemsFromInventoryFactory = (repository) => (command, callback) => {
	repository.get(command.inventoryItemId, function(error, inventoryItem) {
		if(error) {
			callback(error);
			return;
		}

		try {
			inventoryItem.checkOut(command.numberOfItems);
		}
		catch(error) {
			callback(error);
			return;
		}

		repository.save(inventoryItem, callback);
	});
}
