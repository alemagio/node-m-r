export const renameInventoryItemFactory = (repository) => (command, callback) => {
	repository.get(command.inventoryItemId, function(error, inventoryItem) {
		if(error) {
			callback(error);
			return;
		}

		inventoryItem.rename(command.name);
		repository.save(inventoryItem, callback);
	});
}
