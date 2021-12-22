import * as either from 'either.js'
import * as _ from 'lodash'
import {InvalidDataAreaError} from './errors'

class ReportDatabase {
	constructor () {
		this._dataAreas = {
			InventoryReports: [],
			InventoryDetailsReports: []
		}
	}

	createDump () {
		return this._dataAreas;
	}

	getReport (dataArea, id, callback) {
		simulateAsynchronousIO(() => {
			this._getReportsCollectionFor(dataArea).fold(
				function left(error) {
					callback(error);
				},
				function right(reportsCollection) {
					var requestedReport = _.find(reportsCollection, function(report) {
						return report.id === id;
					});

					callback(null, requestedReport);
				}
			);
		});
	}

	insertReport (dataArea, inventoryReport, callback) {
		simulateAsynchronousIO(() => {
			this._getReportsCollectionFor(dataArea).fold(
				function left(error) {
					callback(error);
				},
				function right(reportsCollection) {
					reportsCollection.push(inventoryReport);
					callback();
				}
			);
		});
	}

	removeReport (dataArea, id, callback) {
		simulateAsynchronousIO(() => {
			this._getReportsCollectionFor(dataArea).fold(
				function left(error) {
					callback(error);
				},
				function right(reportsCollection) {
					_.remove(reportsCollection, function(report) {
						return report.id === id;
					});

					callback();
				}
			);
		});
	}

	_getReportsCollectionFor(dataArea) {
		const reportsCollection = this._dataAreas[dataArea];

		if(reportsCollection)
			return either.right(reportsCollection);
		else
			return either.left(new InvalidDataAreaError('The specified data area is unknown.'));
	}
}

function simulateAsynchronousIO(asynchronousAction) {
	process.nextTick(asynchronousAction);
}

export default new ReportDatabase()