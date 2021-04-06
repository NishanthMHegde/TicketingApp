import {app} from '../../app';
import request from 'supertest';
import {Ticket} from '../../models/ticket';

import mongoose from 'mongoose';

const createTickets = async () =>{
	const title = 'New concert';
	const price = 20;

	const response = await request(app).post('/api/tickets').send({title, price}).set('Cookie',global.signin());
}
it('returns list of all tickets', async ()=>{
	await createTickets();
	await createTickets();
	const response = await request(app).get('/api/tickets/').send({}).set('Cookie',global.signin());
	expect(response.body.length).toEqual(2);
});

