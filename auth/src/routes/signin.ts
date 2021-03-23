import express, {Request, Response} from 'express';
import {Password} from '../services/password';
import { body, validationResult } from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';
import {BadRequestError} from '../errors/bad-request-error';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';
import 'express-async-errors';

const router = express.Router();

router.post('/api/users/signin', 
	[body('email').isEmail().withMessage('The email needs to have an Email format'),
	body('password').trim().notEmpty().withMessage('The password field should not be empty')
	], async (req:Request, res:Response)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		throw new RequestValidationError(errors.array());
	}
	const {email, password} = req.body;
	const existingUser = await User.findOne({email});

	if (!existingUser){
		throw new BadRequestError('Bad Request Error');
	}
	const passwordStatus = await Password.compareHash(existingUser.password, password);
	if (!passwordStatus){
		throw new BadRequestError('Incorrect password was supplied');
	}

	const jwtUser = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_KEY!);
	req.session = {jwt: jwtUser};
	res.status(200).send({existingUser});
});

export {router as SignInRouter};