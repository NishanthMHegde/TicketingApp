import express from 'express';
import {json} from 'body-parser';
import {CurrentUserRouter} from './routes/current-user';
import {SignUpRouter} from './routes/signup';
import {SignInRouter} from './routes/signin';
import {SignOutRouter} from './routes/signout';
import {errorHandler} from './middlewares/error-handler';
import mongoose from 'mongoose';
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

const start = async () => {
	if (!process.env.JWT_KEY){
		throw new Error('JWT_KEY env variable not found!');
	}
	try {
	await mongoose.connect('mongodb://auth-mongo-srv:27017/data', {
		useNewUrlParser: true,
		useUnifiedTopology : true,
		useCreateIndex: true
	});
}
catch(err){
	console.log(err);
}
app.listen(3000, ()=>{
	console.log("Listening on port 3000");
});
};

start();