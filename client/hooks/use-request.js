import {useState} from 'react';
import axios from 'axios';
export const useRequest = ({url, method, body, onSuccess}) =>{
const [errors, setErrors] = useState([]);

const doRequest = async ()=>{
	try{
		errors = null;
	const response = await axios[method](url, body);
	if (onSuccess){
		onSuccess(response.data);
	}
}catch(err){
	return (
		<div className="alert alert-danger">
<ul className="my-0">
<h4>Ooops</h4>
<p>{err}</p>
{err.response.data.errors.map(err=>{
	<li>{err.message}</li>
})}
</ul>
</div>
		);
}
};

return {doRequest, errors};
};