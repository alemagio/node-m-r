import { ReportAggregator } from "./report-aggregator";
import reportDatabase from '../reportDatabase'

const INVENTORY_REPORTS = 'InventoryReports';

export class InventoryReportAggregator extends ReportAggregator {
  handleInventoryItemCreated(message, callback) {
    var inventoryReport = {
      id: message.aggregateRootId,
      name: message.name
    };

    reportDatabase.insertReport(INVENTORY_REPORTS, inventoryReport, callback);
  }

  handleInventoryItemRenamed (message, callback) {
    reportDatabase.getReport(INVENTORY_REPORTS, message.aggregateRootId,
      function(error, inventoryReport) {
        if(error)
          return callback(error);

        if(!inventoryReport)
          return reportNotFound(message.aggregateRootId, callback);

        inventoryReport.name = message.name;
        callback();
      }
    );
  }

  handleInventoryItemDeactivated (message, callback) {
    reportDatabase.removeReport(INVENTORY_REPORTS, message.aggregateRootId, callback);
  }
}
