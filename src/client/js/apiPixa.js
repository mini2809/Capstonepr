 export async function postData(url,text){	
	const response = await fetch(url,{
		method: 'POST',
		credentials: 'same-origin',
		headers:{
			"Content-type":'application/json',
		},
		body: JSON.stringify(text),
	})
	try{
		const newData = await response.json()
		console.log(newData)
		return newData;
	}
	catch(error){
		console.log("vaibhav")
		console.log(error);
	}
}

 export async function apiPixacall(obj){
	let data = await postData('http://localhost:8087/test',obj)
	return data
}
