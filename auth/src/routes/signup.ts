import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import {RequestValidationError} from '@nmhtickets/common';
import {DatabaseConnectionError} from '@nmhtickets/common';
import {BadRequestError} from '@nmhtickets/common';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';
import 'express-async-errors';

const router = express.Router();

router.post('/api/users/signup', [
	body('email').isEmail().withMessage('The email needs to have an Email format'),
	body('password').trim().isLength({min:4, max: 20}).withMessage('The password needs to be min 4 chars long and have a max char of 20')
	], async (req: Request, res: Response)=>{

	const errors = validationResult(req);
	if (!errors.isEmpty()){
		throw new RequestValidationError(errors.array());
	}
	const {email, password} = req.body;
	const existingUser = await User.findOne({email});

	if (existingUser){
		throw new BadRequestError('Bad Request Error');
	}

	const user = User.build({email, password});
	await user.save();
	const jwtUser = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!);
	req.session = {jwt: jwtUser};
	res.status(201).send({user});
});

export {router as SignUpRouter};