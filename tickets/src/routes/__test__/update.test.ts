import {app} from '../../app';
import request from 'supertest';
import {Ticket} from '../../models/ticket';


it('returns a status code that is not 404 when creating new ticket', async ()=>{
	const title = 'New concert';
	const price = 20;
	const cookie = global.signin();
	const ticket1 = await request(app).post('/api/tickets').send({title, price}).set('Cookie',cookie);
	const updateResponse = await request(app).put(`/api/tickets/${ticket1.body.id}`).send({title: "Brand New Concert", price: 25}).set('Cookie',cookie);
	expect(updateResponse.status).toEqual(201);
});

