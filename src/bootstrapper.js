import { InventoryReportAggregator, InventoryDetailsReportAggregator } from './reportAggregators'
import messageBus from './messageBus'

export function bootstrap() {
	var inventoryReportAggregator = new InventoryReportAggregator();
	messageBus.registerEventHandler(inventoryReportAggregator);

	var inventoryDetailsReportAggregator = new InventoryDetailsReportAggregator();
	messageBus.registerEventHandler(inventoryDetailsReportAggregator);
};