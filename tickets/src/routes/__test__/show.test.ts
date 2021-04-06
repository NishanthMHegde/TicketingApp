import {app} from '../../app';
import request from 'supertest';
import {Ticket} from '../../models/ticket';
import mongoose from 'mongoose';

it('returns a status code that is 404 when ticket is not found', async ()=>{
	const id = new mongoose.Types.ObjectId().toHexString();
	console.log(id);
	const response = await request(app).get(`/api/tickets/${id}`).send({}).set('Cookie',global.signin());
	expect(response.status).toEqual(404);
});

it('returns the correct ticket corresponding to the ticket ID if ticket is found', async ()=>{
	const title = 'New concert';
	const price = 20;

	const response1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',global.signin());
	console.log(response1.body.ticket.id);
	const response2 = await request(app).get(`/api/tickets/${response1.body.ticket.id}`).send({}).set('Cookie',global.signin());
	expect(response2.status).toEqual(200);
	expect(response2.body.title).toEqual(title);
	expect(response2.body.price).toEqual("20");
});