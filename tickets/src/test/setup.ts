import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global{
	namespace NodeJS {
		interface Global{
			signin():string
		}
	}
}
let mongo:any;
beforeAll(async ()=>{
	process.env.JWT_KEY = 'asdf';
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology : true
	});
});

beforeEach(async ()=>{
	const mongoCollections = await mongoose.connection.db.collections();
	for (let collection of mongoCollections){
		await collection.deleteMany({});
	}
});

afterAll(async ()=>{
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () =>{
	//create a payload
	const payload = {id:'123', email:'test@test.com'};
	//sign the payload
	const jwtToken = jwt.sign(payload, process.env.JWT_KEY!);
	// create a Javascript object of payload
	const jwtArray = {jwt: jwtToken};
	//create a JSON out of the payload
	const jsonPayload = JSON.stringify(jwtArray);
	//convert it into a base64 from
	const encodedJWT = Buffer.from(jsonPayload).toString('base64');
	return [`express:sess=${encodedJWT}`];
};