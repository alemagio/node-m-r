import { ReportAggregator } from './report-aggregator';

const INVENTORY_DETAILS_REPORTS = 'InventoryDetailsReports';

export class InventoryDetailsReportAggregator extends ReportAggregator {
  handleInventoryItemCreated (message, callback) {
    var inventoryDetailsReport = {
      currentNumber: 0,
      id: message.aggregateRootId,
      name: message.name
    };

    reportDatabase.insertReport(INVENTORY_DETAILS_REPORTS, inventoryDetailsReport, callback);
  }

  handleInventoryItemRenamed (message, callback) {
    reportDatabase.getReport(INVENTORY_DETAILS_REPORTS, message.aggregateRootId,
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

  handleItemsCheckedInToInventory (message, callback) {
    reportDatabase.getReport(INVENTORY_DETAILS_REPORTS, message.aggregateRootId,
      function(error, inventoryReport) {
        if(error)
          return callback(error);

        if(!inventoryReport)
          return reportNotFound(message.aggregateRootId, callback);

        inventoryReport.currentNumber += message.numberOfItems;
        callback();
      }
    );
  }

  handleItemsCheckedOutFromInventory (message, callback) {
    reportDatabase.getReport(INVENTORY_DETAILS_REPORTS, message.aggregateRootId,
      function(error, inventoryReport) {
        if(error)
          return callback(error);

        if(!inventoryReport)
          return reportNotFound(message.aggregateRootId, callback);

        inventoryReport.currentNumber -= message.numberOfItems;
        callback();
      }
    );
  }

  handleInventoryItemDeactivated (message, callback) {
    reportDatabase.removeReport(INVENTORY_DETAILS_REPORTS, message.aggregateRootId, callback);
  }
}
