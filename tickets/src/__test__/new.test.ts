import {app} from '../../src/app';
import request from 'supertest';

it('returns a status code that is not 404 when creating new ticket', async ()=>{
	const response = await request(app).post('/api/tickets').send({});
	expect(response.status).not.toEqual(404);
});

it('returns a status code that is 201 upon creating new ticket when user is signed in', async ()=>{
	
	const response = await request(app).post('/api/tickets').send({}).set('Cookie',global.signin());
	expect(response.status).toEqual(201);
});

it('returns a status code that is 401 upon creating new ticket when user is not signed in', async ()=>{
	
	const response = await request(app).post('/api/tickets').send({});
	expect(response.status).toEqual(401);
});