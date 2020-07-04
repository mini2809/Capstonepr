import 'babel-polyfill'
import { getdataGeoname, getdataWeatherbit, daysBetweenDates, randomInteger} from './api_handler.js'
import { apiPixacall, postData } from './apiPixa'

// helper function to create map of images from folder media/icons
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../media/icons', false, /\.(png|jpe?g|svg)$/));

export async function handle_submit(event){
	// to avoid default behavior of onclick function
	event.preventDefault()

	// variable declarations
	let country= document.getElementById("country").value
	let city = document.getElementById("city").value

	let start_date = document.getElementById("start_date").value
	let end_date = document.getElementById("end_date").value
	let today_date = new Date();

	
	let start= new Date(start_date).getTime()
	let today = today_date.getTime(today_date)
	let end = new Date(end_date).getTime()


	if(start > end)
		alert("enter valid dates : start date should be less than end date")
	else{
		if(start >= today)
		{	
			//checking all the information are filled or not
			if (city == "" || country == "" || start_date == ""|| end_date == "")
				alert("Fill all the necessary information")

			let tripDays = await daysBetweenDates(start_date,end_date)
			document.getElementById("duration").innerHTML = "Trip-Duration : "+tripDays;
			document.getElementById("cityName").innerHTML = city;
			document.getElementById("countryName").innerHTML = country;

			//computing duration of trip 
			let diff = await daysBetweenDates(today_date, start_date) 
			document.getElementById("daysLeft").innerHTML = "Your trip is "+ (diff+1) +" day(s) away"


			if(diff+ tripDays >= 16 )
				alert("cannot predict beyond 16 days from today")
			else{
				getdataGeoname(city)
				.then(res=> {
					return res;
				})
				.then(resp => getdataWeatherbit(resp,tripDays))
				.then( res =>{
					let el = document.getElementById("weatherData")
					let i;
					el.innerHTML=""
					for( i=0+diff+1; i<=diff+tripDays ; i++)
					{	
						let imageKey = res.data[i].weather.icon+".png" 
						let icon=images[imageKey].default
						el.innerHTML += res.data[i].datetime+' : '+ res.data[i].weather.description +' '+
						"<img  class=\"icon\" src=\""+ icon +"\"/>"
						+"<br/></br></br>"
					}
				}) 
				.then(
					await apiPixacall({'coun':country,'city': city})
					.then( res =>{
						let hit = res.hits.length
						let element = document.getElementById("image")
						element.classList.add('cityImage')
						randomInteger(0,hit).then(ran =>{
							element.src = res.hits[ran].webformatURL;
						})

					})
				)
			 }

		}
		else
			alert("trips can be planned in future only!")
		}
}	







