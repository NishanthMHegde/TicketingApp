import {app} from '../../src/app';
import request from 'supertest';
import {Ticket} from '../models/ticket';

it('returns a status code that is not 404 when ticket is not found', async ()=>{
	const response = await request(app).post('/api/tickets').send({});
	expect(response.status).not.toEqual(404);
});

