import { AggregateRoot } from "../aggregateRoot";
import { subscribeToDomainEvents } from "./lib";

export class InventoryItem extends AggregateRoot {
	constructor (id, name) {
		super(id);

		this._activated = true;
		this._name = '';
		this._number = 0;

		subscribeToDomainEvents(this)

		if(name) {
			this.apply('InventoryItemCreated', {
				name: name
			});
		}
	}

  checkIn (numberOfItems) {
    this.apply('ItemsCheckedInToInventory', {
      numberOfItems: numberOfItems
    });
  }

  checkOut (numberOfItems) {
    if(this._number < numberOfItems) {
      throw new InvalidOperationError(`The inventory needs to replenished in order to checkout ${numberOfItems} items.`);
    }

    this.apply('ItemsCheckedOutFromInventory', {
      numberOfItems: numberOfItems
    });
  }

  deactivate () {
    if(!this._activated)
      throw new InvalidOperationError('This inventory item has already been deactivated.');

    this.apply('InventoryItemDeactivated', {});
  }

  rename (name) {
    this.apply('InventoryItemRenamed', {
      name: name
    });
  }
}
