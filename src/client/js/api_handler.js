const Url='http://api.geonames.org/searchJSON?'
const username = 'mini928'


// <--------lat and long fetched from geoname api----------->
export async function getdataGeoname(namej){
	let obj={}
	let fetchData = await fetch(Url+'name='+namej+'&username=mini928&countryCode=IN&maxRows=10&style=SHORT')
	let data = await fetchData.text();
	let Data=JSON.parse(data)
	console.log(Data)
	let lat =Data.geonames[0].lat
	let long =Data.geonames[0].lng
	obj.lat=lat
	obj.long=long
	return obj;
}

const key='c1d26e97df11444c8fac6881f237df9e'
const url=' https://api.weatherbit.io/v2.0/forecast/daily?lat='

export async function getdataWeatherbit(obj , tripDays)
{
	let fetchData=await fetch(url+obj.lat+'&lon='+obj.long+'&key='+key)
	let data = await fetchData.text();
	let Data = JSON.parse(data)
	let days;
	if (tripDays>16)
		days=15;
	else
		days=tripDays;
	for(let i=0;i<=days;i++)
		console.log(Data.data[i].weather);
}	
//daysBetweenDates(today,start_date)// 25 22
export async function daysBetweenDates(s_date,e_date){
	const msPerDay =24 * 60 * 60 * 1000;
	let start = new Date(s_date).getTime()// 25
	let end =  new Date(e_date).getTime()//22
	let diff =  (end - start) / msPerDay;
	let daysLeft=Math.round(diff)
	return daysLeft;
}




