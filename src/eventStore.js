'use strict';

import {PassThrough} from 'stream'
import _ from 'lodash'
import {ConcurrencyViolationError} from './errors'

class EventStore {
	constructor(store = []) {
		this._store = store
	}

	createDump() {
		return this._store
	}

	getAllEventsFor(aggregateRootId, callback) {
		this._findStoredDomainEvents(aggregateRootId, function(error, storedDocument) {
			let eventStream;

			if(error)
				return callback(error);

			if(!storedDocument)
				return callback();

			eventStream = new PassThrough({ objectMode: true });

			storedDocument.events.forEach(function(domainEvent) {
				eventStream.write(domainEvent);
			});

			eventStream.end();
			callback(null, eventStream);
		});
	}

	save(domainEvents, aggregateRootId, expectedAggregateRootVersion, callback) {
		this._findStoredDomainEvents(aggregateRootId, (error, storedDocument) => {
			let concurrencyViolation;

			if(error)
				return callback(error);

			if(!storedDocument) {
				storedDocument = {
					id: aggregateRootId,
					events: domainEvents
				};

				this._store.push(storedDocument);
				return callback();
			}

			if(_.last(storedDocument.events).eventVersion !== expectedAggregateRootVersion) {
				concurrencyViolation = new ConcurrencyViolationError('An operation has been performed on an aggregate root that is out of date.');
				return callback(concurrencyViolation);
			}

			domainEvents.forEach(function(domainEvent) {
				storedDocument.events.push(domainEvent);
			});

			callback();
		});
	}

	_findStoredDomainEvents(aggregateRootId, callback) {
		simulateAsynchronousIO(() => {
			const storedDocument = _.find(this._store, function(document) {
				return document.id === aggregateRootId;
			});

			callback(null, storedDocument);
		});
	}
}

function simulateAsynchronousIO(asynchronousAction) {
	process.nextTick(asynchronousAction);
}

export default new EventStore()
