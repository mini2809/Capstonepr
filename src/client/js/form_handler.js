import 'babel-polyfill'
import { getdataGeoname } from './api_handler.js'
import { getdataWeatherbit} from './api_handler.js'
import { daysBetweenDates } from './api_handler.js'



export async function handle_submit(event)
{
	event.preventDefault()
	let country= document.getElementById("country").value
	let city = document.getElementById("city").value
	let start_date = document.getElementById("start_date").value
	let end_date = document.getElementById("end_date").value
	let result = document.getElementById("result");

	let today = new Date();
	console.log(today.getTime())
	let start=new Date(start_date).getTime()
	//console.log(start.getTime())
	let tod =today.getTime()
	if (tod >= start)
	{

		if (city == "" || country == "" || start_date == ""|| end_date == "")
			alert("enter data")
		
		if( await daysBetweenDates(today,start_date) > 16)
			alert("cannot predict beyond 16 days from today")
		else{
			let tripDays = await daysBetweenDates(start_date,end_date)
			console.log("the trip is "+tripDays+ " days long");
			result.innerHTML = "the trip is "+tripDays+  " days long";
			getdataGeoname(city)
			.then(res=> {console.log(res)
				return res;
			})
			.then(resp => getdataWeatherbit(resp,tripDays))
			.then(getDataPixa()
				.then(res => {
				document.getElementById("image").src = res.hits[0].webformatURL})	 
			)
			
		}	

	}
	else
		alert("trips be planned in future only")
}








