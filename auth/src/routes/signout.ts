import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res)=>{
	req.session = {};
	res.send({});
});

export {router as SignOutRouter};