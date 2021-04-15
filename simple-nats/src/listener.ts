import nats, {Message} from 'node-nats-streaming';
import {randomBytes} from 'crypto';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
	console.log('Connected to NATS listener');
	stan.on('close', ()=>{
		console.log("Listening is exiting!");
		process.exit();
	});
	const options = stan.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('account-service');
	const subscription = stan.subscribe('ticket:created', 'new-queue-group', options);
	subscription.on('message', (msg: Message)=>{
		const data = msg.getData();
		if (typeof data === 'string'){
			console.log(`Got a message with sequence number ${msg.getSequence()} and data: ${data}`);

		}
		msg.ack();
	});
});

process.on('SIGINT', ()=>{stan.close();});
process.on('SIGTERM', ()=>{stan.close();});