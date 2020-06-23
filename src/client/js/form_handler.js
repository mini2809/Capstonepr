import 'babel-polyfill'
import { getdataGeoname } from './api_handler.js'
import { getdataWeatherbit} from './api_handler.js'

export function handle_submit(event)
{
	event.preventDefault()
	let country= document.getElementById("country").value
	let city = document.getElementById("city").value
	let start_date = document.getElementById("start_date").value
	let end_date = document.getElementById("end_date").value

	if (city == "")
		alert("enter data")
	else{
		getdataGeoname(city)
		.then(res=> {console.log(res)
				return res;
		}).then(resp => getdataWeatherbit(resp))
	}
}


