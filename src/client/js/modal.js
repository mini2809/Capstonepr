const getDataPixa = require('../../server/api.js')
import { getdataGeoname, getdataWeatherbit} from './api_handler.js'
import { getTodayDateStr, daysBetweenDates } from './default_functions.js'
import { TripDaysAway } from './fetchSaveTrips.js'
import { importAll } from './form_handler.js'


// helper function to create map of images from folder media/icons
const images = importAll(require.context('../media/icons', false, /\.(png|jpe?g|svg)$/));

export function modal(event){
	event.preventDefault()
	let id = event.path[1].id
	let obj={city:'',coun:''};

	let cardDiv = document.querySelector('.cardDimension')

	let	modal = document.querySelector('.modal') 
	let modal_content = document.querySelector('.modal-content')
	let span = document.querySelector('.close')

	span.onclick = function() {
		modal.style.visibility = "hidden";
		modal_content.removeChild(imageBox);
		modal_content.removeChild(descriptionBox);
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.visibility = "hidden";
			modal_content.removeChild(imageBox);
			modal_content.removeChild(descriptionBox);
		}
	}
	//every time clicking cross button does not
	let imageBox = document.createElement('div')
	modal_content.appendChild(imageBox)
	imageBox.classList.add('imageBox')
	let image=document.querySelector('.imageBox')

	let descriptionBox =  document.createElement('div')
	modal_content.appendChild(descriptionBox)
	descriptionBox.classList.add('descriptionBox')

	fetch('http://localhost:8087/getSavedTrips')
	.then(res => res.json())
	.then(res=>{
		obj.city = res[id].city;
		obj.coun = res[id].country;
		fetchPopupImage(obj,image);
		fetchPopupWeather(res,id,descriptionBox)
	})
	modal.style.visibility = "visible"
}
	
export function fetchPopupImage(obj,image){
	getDataPixa(obj)
	.then(result=>{
	image.style.backgroundImage = 'url('+result.hits[0].webformatURL+')'
	image.style.backgroundSize ="cover"
})
}

export async function fetchPopupWeather(res,id,descriptionBox){
	let obj={weather:'',array:""};
	getdataGeoname(res[id].city)
	.then(resp=>{
			return resp;
	})
	.then(resp=>{
		getdataWeatherbit(resp)
		.then(resp=> {
			obj.weather = resp
		}).then(()=>{
				obj.array= res;
				//console.log(obj)
				return obj;
		}).then(obj=>updatePopupUi(obj,id,descriptionBox))
	})
}	
export async function updatePopupUi(obj,id,descriptionBox){
	
	descriptionBox.innerHTML = "Your trip to "+"<strong>"+obj.array[id].city+"</strong>"+","
	+"<b>"+obj.array[id].country+"</b>"+"<p>Your trip is "+obj.array[id].tripDuration+" day(s) long </p>"
	
	let daysLeft= await TripDaysAway(obj.array[id].start_date)
	let tripDays = obj.array[id].tripDuration

	for(let i=daysLeft+1 ; i<=daysLeft+tripDays ; i++){
		let imageKey = obj.weather.data[i].weather.icon+".png" 
		let icon = images[imageKey].default
		descriptionBox.innerHTML +="<p class=\"forecastData\">"+obj.weather.data[i].datetime+' : '
		+obj.weather.data[i].weather.description+"<img class=\"icon\" src=\""+ icon +"\"/>"+"</p>"

	}
}
	
	

 
