const Url='http://api.geonames.org/searchJSON?'
const username = 'mini928'

const fetch = require('node-fetch');
// <--------lat and long fetched from geoname api----------->
export async function getdataGeoname(city){
	let obj={}
	let fetchData = await fetch(Url+'name='+city+'&username=mini928&countryCode=IN&maxRows=10&style=SHORT')
	let Data=JSON.parse(await fetchData.text())

	obj.lat=Data.geonames[0].lat
	obj.long=Data.geonames[0].lng

	return obj;
}

const key = 'c1d26e97df11444c8fac6881f237df9e'
const url = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='

// calling weatherbit api for weather forecast
export async function getdataWeatherbit(obj )
{	
	let fetchData=await fetch(url+obj.lat+'&lon='+obj.long+'&key='+key)
	let Data = JSON.parse(await fetchData.text())
	
	return Data;	
}	





