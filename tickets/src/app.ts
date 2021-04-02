import {createTicketRouter} from './routes/createTicket';
import {errorHandler} from '@nmhtickets/common';
import {currentUser} from '@nmhtickets/common';
import express from 'express';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(cookieSession({
	signed:false
}));
app.use(currentUser);
app.use(json());
app.use(errorHandler);
app.use(createTicketRouter);

export {app};