import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto';
import {TicketCreatedListener} from './events/ticket-created-listener';

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
	
new TicketCreatedListener(stan).listen();
	
});

process.on('SIGINT', ()=>{stan.close();});
process.on('SIGTERM', ()=>{stan.close();});



