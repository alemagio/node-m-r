export function reportNotFound(aggregateRootId, callback) {
	callback(new ReportNotFoundError(`The report with identifier "${aggregateRootId}" could not be found in the data store.`));
}
