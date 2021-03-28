import {useState} from 'react';
import axios from 'axios';
export const useRequest = ({url, method, body, onSuccess}) =>{
const [errors, setErrors] = useState(null);

const doRequest = async ()=>{
	try{
		setErrors(null);
	const response = await axios[method](url, body);
	console.log(response);
	if (onSuccess){
		onSuccess(response.data);
	}
}catch(err){
	// console.log(err.response.data);
	setErrors(
		<div className="alert alert-danger">
<ul className="my-0">
<h4>Ooops</h4>
{err.response.data.error.map(my_err=>(
	<li key={err.message}>{my_err.message}</li>
))}
</ul>
</div>
		);
}
};

return {doRequest, errors};
};