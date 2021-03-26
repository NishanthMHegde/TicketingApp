import {app} from '../../../src/app';
import request from 'supertest';

it('returns 201 upon successful signup', async ()=>{
return request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
});

it('returns 400 for incorrect Email', async ()=>{
	return request(app).post('/api/users/signup').send({email:'test@test', password: 'abcd'}).expect(400);
});

it('returns 400 for incorrect password', async ()=>{
	return request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abc'}).expect(400);
});

it('returns 400 for incorrect Email and password', async ()=>{
	return request(app).post('/api/users/signup').send({email:'test@test', password: 'abc'}).expect(400);
});

it('returns 400 for an existing user', async ()=>{
	await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
	return request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(400);
});