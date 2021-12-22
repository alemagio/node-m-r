class CustomError extends Error {
	constructor (name, message, error) {
		this.error = error;
		this.name = name;

		super(message)
		super.captureStackTrace(this, arguments.callee);
	}
}

export class InvalidOperationError extends CustomError {
	constructor(message, error) {
		super('InvalidOperationError', message, error)
	}
}

export class ConcurrencyViolationError extends CustomError {
	constructor(message, error) {
		super('ConcurrencyViolationError', message, error)
	}
}

export class InvalidDataAreaError extends CustomError {
	constructor(message, error) {
		super('InvalidDataAreaError', message, error)
	}
}

export class ReportNotFoundError extends CustomError {
	constructor(message, error) {
		super('ReportNotFoundError', message, error)
	}
}
