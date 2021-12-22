export function subscribeToDomainEvents(inventoryItem) {
  inventoryItem.onEvent('InventoryItemCreated', (inventoryItemCreated) => {
    inventoryItem._activated = true;
    inventoryItem._name = inventoryItemCreated.name;
  });

  inventoryItem.onEvent('InventoryItemRenamed', (inventoryItemRenamed) => {
    inventoryItem._name = inventoryItemRenamed.name;
  });

  inventoryItem.onEvent('ItemsCheckedInToInventory', (itemsCheckedInToInventory) => {
    inventoryItem._number += itemsCheckedInToInventory.numberOfItems;
  });

  inventoryItem.onEvent('ItemsCheckedOutFromInventory', (itemsCheckedOutFromInventory) => {
    inventoryItem._number -= itemsCheckedOutFromInventory.numberOfItems;
  });

  inventoryItem.onEvent('InventoryItemDeactivated', (inventoryItemDeactivated) => {
    inventoryItem._activated = false;
  });
}
