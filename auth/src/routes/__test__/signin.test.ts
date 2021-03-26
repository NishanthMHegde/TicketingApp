import {app} from '../../../src/app';
import request from 'supertest';

it('returns 200 upon successful signin', async ()=>{
await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
return request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abcd'}).expect(200);
});

it('returns 400 for incorrect Email', async ()=>{
	await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
	return request(app).post('/api/users/signin').send({email:'test@test', password: 'abcd'}).expect(400);
});

it('returns 400 for incorrect password', async ()=>{
	await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
	return request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abc'}).expect(400);
});

it('returns 400 for incorrect Email and password', async ()=>{
	await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
	return request(app).post('/api/users/signin').send({email:'test@test', password: 'abc'}).expect(400);
});

it('returns a cookie after sign in', async ()=>{
	await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
 	const responseBody = await request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abcd'}).expect(200);
 	return expect(responseBody.get('Set-Cookie')).toBeDefined();
 	
});