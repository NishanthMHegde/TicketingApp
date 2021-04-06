import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {requireAuth, validateRequest} from '@nmhtickets/common';
import { NotFoundError } from '@nmhtickets/common';
import {Ticket} from '../models/ticket';
import {RequestValidationError, NotAuthorizedError} from '@nmhtickets/common';
import 'express-async-errors';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
	body('title').notEmpty().withMessage('The title should not be empty'),
	body('price').isFloat({gt:0}).withMessage('Price should be greater than 0')
	], validateRequest, async (req: Request,res: Response) =>{
		const ticket = await Ticket.findById(req.params.id);
		console.log(`Found a ticket ${ticket}`);

		  if (!ticket) {
		    throw new NotFoundError();
		  }

		if (!(ticket.userId===req.currentUser!.id)){
			console.log(ticket.userId);
			console.log(req.currentUser!.id)
			throw new NotAuthorizedError('Not authorized to make changes to ticket');
		}
		const {title, price} = req.body;
		
		ticket.update({title, price});
		await ticket.save();

	res.status(201).send({ticket});
});

export {router as updateTicketRouter};