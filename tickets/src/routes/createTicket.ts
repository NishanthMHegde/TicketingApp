import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {requireAuth, validateRequest} from '@nmhtickets/common';
import {Ticket} from '../models/ticket';
import {RequestValidationError} from '@nmhtickets/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
	body('title').notEmpty().withMessage('The title should not be empty'),
	body('price').isFloat({gt:0}).withMessage('Price should be greater than 0')
	], validateRequest, async (req: Request,res: Response) =>{
		const {title, price} = req.body;
		const ticket = Ticket.build({title, price, userId: req.currentUser!.id});
		await ticket.save();

	res.status(201).send({ticket});
});

export {router as createTicketRouter};