const fetch = require('node-fetch');
//sending users input to server for calling pixabay api
 export async function postData(url,textObj){
	const response = await fetch(url,{
		method: 'POST',
		credentials: 'same-origin',
		headers:{
			"Content-type":'application/json',
		},
		body: JSON.stringify(textObj),
	})
	try{
		const newData = await response.json()
		//console.log(newData)
		return newData;
	}
	catch(error){
		console.log(error);
	}
}

 export async function apiPixacall(obj){
	let data = await postData('http://localhost:8087/test',obj)
	return data
}
