import {createTicketRouter} from './routes/createTicket';
import {showTicketRouter} from './routes/showTicket';
import {showAllTicketsRouter} from './routes/index';
import {updateTicketRouter} from './routes/updateTicket';
import {errorHandler, NotFoundError} from '@nmhtickets/common';
import {currentUser} from '@nmhtickets/common';
import express from 'express';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
	signed:false
}));

app.use(errorHandler);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketsRouter);
app.use(updateTicketRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export {app};