import { getTodayDateStr, daysBetweenDates } from './default_functions.js'
const getDataPixa = require('../../server/api.js')
import { modal ,fetchPopupImage, fetchPopupWeather, updatePopupUi } from './modal.js'

export function fetchSaveTrips(){	
	let objectLength;
	fetch('http://localhost:8087/getSavedTrips')
	.then(res => res.json())
	.then(resp => {return resp})
	.then(res => createCards(res))
}

export async function createCards(res){ 
	let Length = res.length;
	let container = document.getElementById("savedTrips")
	container.innerHTML = "";
	for(let i=0; i<Length; i++){
		
		let cardDiv = document.createElement('div');
		container.appendChild(cardDiv);
		cardDiv.classList.add('cardDimension');
		cardDiv.id = i;
		

		let childDiv = document.createElement('div');
		cardDiv.appendChild(childDiv);
		childDiv.classList.add('imageCard');


		let overlay = document.createElement('div');
		cardDiv.appendChild(overlay);
		overlay.classList.add('centered');
		overlay.innerHTML ="Your Trip to "+ res[i].city +", "+ res[i].country

		let childDiv1 = document.createElement('div');
		cardDiv.appendChild(childDiv1);
		childDiv1.classList.add('child');

		
		let background_image_url = await fetchImage(res, i);
		childDiv.style["background-image"] = "url(\'"+ background_image_url+"\')"
		
		let days = await TripDaysAway(res[i].start_date)
		//console.log(days)
		childDiv1.innerHTML = "Your Trip is "+ days +" days away"; 
		
		cardDiv.onclick=(e)=>{
			modal(e)
		}
	}

}
export async function fetchImage(res,id){
	let obj = {"city":res[id].city ,"coun": res[id].country}
	let image = await getDataPixa(obj)
	 return image.hits[0].webformatURL
}

export async function TripDaysAway(start_date){
	let today = await getTodayDateStr()
	let daysLeft = await daysBetweenDates(today, start_date)
	return daysLeft;
}


