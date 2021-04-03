import express, {Request, Response} from 'express';
import {requireAuth, NotFoundError} from '@nmhtickets/common';
import {Ticket} from '../models/ticket';


const router = express.Router();

router.get('/api/tickets/:id', requireAuth, async (req: Request,res: Response) =>{
		const ticket = await Ticket.findOne({id: req.params.id});
		if (!ticket){
			throw new NotFoundError("The page/object you are looking for was not found!");
		}

		res.status(200).send({ticket});

});

export {router as createTicketRouter};