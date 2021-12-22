export const deactivateInventoryItemFactory = (repository) => (command, callback) => {
	repository.get(command.inventoryItemId, function(error, inventoryItem) {
		if(error) {
			callback(error);
			return;
		}

		try {
			inventoryItem.deactivate();
		}
		catch(error) {
			callback(error);
			return;
		}

		repository.save(inventoryItem, callback);
	});
}
