import 'babel-polyfill'
import { getdataGeoname, getdataWeatherbit} from './api_handler.js'
import { apiPixacall, postData } from './apiPixa'
import { postTripData, saveTrip } from './savetrip.js'
import { getTodayDateStr, daysBetweenDates, randomInteger, isEverythingValid } from './default_functions.js'

// helper function to create map of images from folder media/icons
export function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../media/icons', false, /\.(png|jpe?g|svg)$/));

export async function handle_submit(event){
	event.preventDefault()

	let start_date = document.getElementById("start_date").value
	let end_date = document.getElementById("end_date").value
	let today = await getTodayDateStr()
	let country= document.getElementById("country").value
	let city = document.getElementById("city").value

	let isValid = await isEverythingValid(country, city, start_date, end_date)

	if(!isValid)
		return;
	
	//handle_transition(event);
	let daysLeft = await daysBetweenDates(today, start_date)
	let tripDays = await daysBetweenDates(start_date, end_date)

	// document.getElementById("duration").innerHTML = "Trip-Duration : "+tripDays;
	// document.getElementById("cityName").innerHTML = "Your Trip to "+"<strong>"+city+"</strong>" + ",";
	// document.getElementById("countryName").innerHTML = "<strong>"+country+"</strong>";

	// document.getElementById("daysLeft").innerHTML = "Your trip is "+ (daysLeft+1) +" day(s) away"

	let objectToPost = {'country':country,'city':city ,'start_date':start_date, 'tripDuration': tripDays}
	saveTrip(objectToPost);

}
// 	apiPixacall({'coun':country,'city': city}) 
// 	.then( res =>{
// 		let hit = res.hits.length
// 		let image = document.getElementById("image")
// 		image.classList.add('cityImage')
// 		randomInteger(0,hit-1).then(ran =>{
// 			image.src = res.hits[ran].webformatURL;
// 		})
// 	})

// 	getdataGeoname(city)
// 	.then(res=> {return res})
// 	.then(resp => getdataWeatherbit(resp,tripDays))
// 	.then(res =>{
// 		let weatherData = document.getElementById("weatherData") 
// 		weatherData.innerHTML = "";
// 		let i = 0;
// 		for( i = daysLeft+1; i <= daysLeft+tripDays ; i++)
// 		{	
// 			let imageKey = res.data[i].weather.icon+".png" 
// 			let icon = images[imageKey].default
// 			weatherData.innerHTML += res.data[i].datetime+' : '+ res.data[i].weather.description 
// 			+' '+"<img class=\"icon\" src=\""+ icon +"\"/>"+"<br><br>"
// 		}
// 	})
// }

// export function handle_transition(event){
// 	event.preventDefault()
// 	let x= document.getElementById("result")
// 	let y= document.getElementById("main-content")	
// 	x.setAttribute('style','visibility: visible');
// 	y.classList.add('transClass');
// }