import {CustomError} from './custom-error';

export class DatabaseConnectionError extends CustomError{
	statusCode = 500;
	constructor(){
		super('This is a database connection error');
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors(){
		return [{message: 'Database Connection error'}];
	}
}