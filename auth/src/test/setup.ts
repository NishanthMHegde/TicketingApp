import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

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