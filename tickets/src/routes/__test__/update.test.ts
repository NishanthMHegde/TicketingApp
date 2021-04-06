import {app} from '../../app';
import request from 'supertest';
import {Ticket} from '../../models/ticket';
import mongoose from 'mongoose';

it('returns a status code of 201 when successfully updating ticket', async ()=>{
	const title = 'New concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({title: "Brand New Concert", price: 25}).set('Cookie',cookie);
	expect(updateResponse.status).toEqual(201);
});


it('returns a status code of 401 when another user tries updating ticket', async ()=>{
	const title = 'New concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({title: "Brand New Concert", price: 25}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(401);
});

it('returns a status code of 404 when updating non-existant ticket', async ()=>{
	const title = 'New concert';
	const price = 20;
	const cookie = global.signin();
	const id = new mongoose.Types.ObjectId().toHexString();
	const updateResponse = await request(app).put(`/api/tickets/${id}`).send({title: "Brand New Concert", price: 25}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(404);
});

it('returns a status code of 400 when title is empty', async ()=>{
	const title = 'New Concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({title: "", price: 25}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(400);
});
it('returns a status code of 400 when title does not exist', async ()=>{
	const title = 'New Concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({price: 25}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(400);
});
it('returns a status code of 400 when price does not exist', async ()=>{
	const title = 'New Concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({title: "Brand new concert"}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(400);
});

it('returns a status code of 400 when price is 0', async ()=>{
	const title = 'New Concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.ticket.id}`).send({title: "Brand new concert", price:0}).set('Cookie',global.signin());
	expect(updateResponse.status).toEqual(400);
});