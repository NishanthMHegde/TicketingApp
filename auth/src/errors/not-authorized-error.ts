import {CustomError} from './custom-error';

export class NotAuthorizedError extends CustomError{
	statusCode = 401;
	constructor(public error:string){
		super('You are not authorized to access this page');
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors(){
		return [{message: this.error}];
	}
}