import {app} from '../../../src/app';
import request from 'supertest';

it('returns 200 upon successful signout', async ()=>{
await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
await request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abcd'}).expect(200);
return request(app).post('/api/users/signout').send().expect(200);
});


it('returns no cookie upon signout', async ()=>{
await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
await request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abcd'}).expect(200);
const response = await request(app).post('/api/users/signout').send().expect(200);
return expect(response.get('Set-Cookie')).toBeUndefined();
});