import nats, {Message} from 'node-nats-streaming';
import {randomBytes} from 'crypto';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
	console.log('Connected to NATS listener');
	const subscription = stan.subscribe('ticket:created');
	subscription.on('message', (msg: Message)=>{
		const data = msg.getData();
		if (typeof data === 'string'){
			console.log(`Got a message with sequence number ${msg.getSequence()} and data: ${data}`);
		}
	console.log("Message received");
	});
});