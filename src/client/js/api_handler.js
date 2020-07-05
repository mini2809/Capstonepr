const Url='http://api.geonames.org/searchJSON?'
const username = 'mini928'


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
export async function getdataWeatherbit(obj , tripDays)
{	
	let fetchData=await fetch(url+obj.lat+'&lon='+obj.long+'&key='+key)
	let Data = JSON.parse(await fetchData.text())
	
	return Data;	
}	


export function daysBetweenDates(s_date,e_date){
	// takes start_date(string) and end_date(string) as input returns number of dats (int)
	const msPerDay =24 * 60 * 60 * 1000;
	let start = new Date(s_date).getTime()
	let end =  new Date(e_date).getTime()
	if(start > end){
		return {error: "start date should be less than or euqal to end date"}
	}

	let diff =  (end - start) / msPerDay;
	let daysLeft = Math.round(diff)
	return daysLeft;
}

export async function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




