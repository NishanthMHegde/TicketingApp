import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from '@nmhtickets/common';
console.clear();
const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
});

stan.on('connect', async ()=>{
	console.log('Connected to NATS publisher');

	const data = {id:'10', title: 'New Ticket', price:20};
	const publisher = new TicketCreatedPublisher(stan);
	await publisher.publish(data);
});