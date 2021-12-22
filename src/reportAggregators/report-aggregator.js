import {Writable} from 'stream'

export class ReportAggregator extends Writable {
  _write (domainEvent, encoding, next) {
    const eventHandlerName = 'handle' + domainEvent.eventName;
    const eventHandler = this[eventHandlerName] || dummyEventHandler;

    eventHandler(domainEvent, function(error) {
      if(error) {
        console.log(error);
        return;
      }

      next();
    });
  }
}

function dummyEventHandler(domainEvent, callback) {
	process.nextTick(callback);
}
