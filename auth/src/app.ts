import {SignInRouter} from './routes/signin';
import {SignOutRouter} from './routes/signout';
import {errorHandler} from '@nmhtickets/common';
import express from 'express';
import {json} from 'body-parser';
import {CurrentUserRouter} from './routes/current-user';
import {SignUpRouter} from './routes/signup';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(cookieSession({
	signed:false
}));
app.use(json());
app.use(SignUpRouter);
app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(errorHandler);

export {app};