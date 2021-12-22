class MessageBus {
	constructor(eventHandlers = []) {
		this._eventHandlers = eventHandlers
	}

	registerEventHandler(eventHandler) {
		this._eventHandlers.push(eventHandler)
	}

	publish(domainEvent) {
		this._eventHandlers.forEach(function(eventHandler) {
			process.nextTick(function() {
				eventHandler.write(domainEvent);
			});
		});
	}
}

export default new MessageBus()
