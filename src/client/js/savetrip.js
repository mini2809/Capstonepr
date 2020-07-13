import { fetchSaveTrips } from './fetchSaveTrips.js'
const fetch = require('node-fetch');
export async function postTripData(url,Obj){
	const response = await fetch(url,{
		method: 'POST',
		credentials: 'same-origin',
		headers:{
			"Content-type":'application/json',
		},
		body: JSON.stringify(Obj),
	})
	try{
		const newData = await response.json()
		return newData;
	}
	catch(error){
		console.log(error);
	}
}

 export async function saveTrip(obj){
 	let data = await postTripData('http://localhost:8087/SaveNewTrips',obj)
	fetchSaveTrips();
	return data
}