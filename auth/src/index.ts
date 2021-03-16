import express from 'express';
import {json} from 'body-parser';
import {CurrentUserRouter} from './routes/current-user';
import {SignUpRouter} from './routes/signup';
import {SignInRouter} from './routes/signin';
import {SignOutRouter} from './routes/signout';
import {errorHandler} from './middlewares/error-handler';
import mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(SignUpRouter);
app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(errorHandler);

const start = async () => {
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