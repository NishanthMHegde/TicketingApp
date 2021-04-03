import {app} from '../../src/app';
import request from 'supertest';
import {Ticket} from '../models/ticket';

it('returns a status code that is not 404 when creating new ticket', async ()=>{
	const response = await request(app).post('/api/tickets').send({});
	expect(response.status).not.toEqual(404);
});

it('returns a status code that is 201 upon creating new ticket when user is signed in', async ()=>{
	let tickets = await Ticket.find({});
	expect(tickets.length).toEqual(0);

	const title = 'New concert';
	const price = 20;

	const response = await request(app).post('/api/tickets').send({title, price}).set('Cookie',global.signin()[0]);
	expect(response.status).toEqual(201);
	expect(response.body.ticket.title).toEqual(title);
	expect(response.body.ticket.price).toEqual("20");
	tickets = await Ticket.find({});
	expect(tickets.length).toEqual(1);
});

it('returns a status code that is 401 upon creating new ticket when user is not signed in', async ()=>{
	
	const response = await request(app).post('/api/tickets').send({});
	expect(response.status).toEqual(401);
});