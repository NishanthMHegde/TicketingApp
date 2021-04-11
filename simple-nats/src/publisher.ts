import nats from 'node-nats-streaming';

console.clear();
const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
	console.log('Connected to NATS publisher');

	const data = JSON.stringify({id:123, title: 'Dummy', price:10});
	stan.publish('ticket:created', data, ()=>{
		console.log('Data published');
	});

});