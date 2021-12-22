import eventStore from "../eventStore";
import messageBus from "../messageBus";
import { InventoryItem } from "./aggregate";

export class InventoryItemRepository {
  save (inventoryItem, callback) {
    const transientEvents = inventoryItem.getTransientEvents();

    eventStore.save(transientEvents, inventoryItem.getId(), inventoryItem.getVersion(), function(error) {
      if(error)
        return callback(error);

      transientEvents.forEach(function(domainEvent) {
        messageBus.publish(domainEvent);
      });

      callback();
    });
  }

  get (inventoryItemId, callback) {
    eventStore.getAllEventsFor(inventoryItemId, function(error, eventStream) {
      if(error)
        return callback(error);

      if(!eventStream)
        return callback();

      const inventoryItem = new InventoryItem(inventoryItemId);

      eventStream.pipe(inventoryItem)
        .on('error', function(error) {
          callback(error);
        })
        .on('finish', function() {
          eventStream.unpipe();
          callback(null, inventoryItem);
        });
    });
  }
}
