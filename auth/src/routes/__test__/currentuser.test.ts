import {app} from '../../../src/app';
import request from 'supertest';

it('returns current user with correct Email', async ()=>{
await request(app).post('/api/users/signup').send({email:'test@test.com', password: 'abcd'}).expect(201);
const responseBody = await request(app).post('/api/users/signin').send({email:'test@test.com', password: 'abcd'}).expect(200);
const response = await request(app).get('/api/users/currentuser').set('Cookie', responseBody.get('Set-Cookie')).send().expect(200);
return expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('returns 401 for unauthorized user', async ()=>{

return request(app).get('/api/users/currentuser').send().expect(401);
})