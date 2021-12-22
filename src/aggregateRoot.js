import { EventEmitter } from 'events'
import { Writable } from 'stream'
import { v4 } from 'uuid'
import { inherits } from 'util'

export class AggregateRoot extends EventEmitter {
	constructor (id) {
		super()
		this._id = id
		this._version = this._eventVersion = 0;
		this._transientEvents = [];
		Writable.call(this, { objectMode: true });

		inherits(AggregateRoot, Writable)
	}

	apply (eventName, domainEvent) {
		this._eventVersion += 1;
		this._enhanceDomainEvent(eventName, domainEvent);
		this._transientEvents.push(domainEvent);
		this.emit(eventName, domainEvent);
	}

	getTransientEvents () {
		return this._transientEvents;
	}

	getId () {
		return this._id;
	}

	getVersion () {
		return this._version;
	};

	onEvent (type, listener) {
		return this.on(type, listener);
	}

	_write (domainEvent, encoding, next) {
		this.emit(domainEvent.eventName, domainEvent);

		this._eventVersion += 1;
		this._version += 1;
		next();
	}


	_enhanceDomainEvent(eventName, domainEvent) {
		domainEvent.aggregateRootId = this._id;
		domainEvent.eventId = v4();
		domainEvent.eventName = eventName;
		domainEvent.eventVersion = this._eventVersion;
	}
}
