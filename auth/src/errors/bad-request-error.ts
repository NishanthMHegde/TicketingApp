import {CustomError} from './custom-error';

export class BadRequestError extends CustomError{
	statusCode = 400;
	constructor(public error:string){
		super('This is a bad request error');
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors(){
		return [{message: this.error}];
	}
}