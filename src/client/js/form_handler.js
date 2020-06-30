	import 'babel-polyfill'
	import { getdataGeoname } from './api_handler.js'
	import { getdataWeatherbit} from './api_handler.js'
	import { daysBetweenDates } from './api_handler.js'
	import { randomInteger } from './api_handler.js'
	import { apiPixacall } from './apiPixa'
	import { postData } from './apiPixa'
	

	export async function handle_submit(event){
		event.preventDefault()
		let country= document.getElementById("country").value
		let city = document.getElementById("city").value
		let start_date = document.getElementById("start_date").value
		let end_date = document.getElementById("end_date").value
		let result = document.getElementById("result");

		
		let today = new Date();
		let start= new Date(start_date).getTime()
		let tod = today.getTime()
		
		if(start >= tod)
		{

			if (city == "" || country == "" || start_date == ""|| end_date == "")
				alert("enter data")
			let diff =  await daysBetweenDates(today,start_date);
			console.log("diff is:" + diff);
			if( diff > 16)
				alert("cannot predict beyond 16 days from today")
			else{
				let tripDays = await daysBetweenDates(start_date,end_date)
				console.log("the trip is "+tripDays+ " days long");
				result.innerHTML = "the trip is "+tripDays+  " days long";
				getdataGeoname(city)
				.then(res=> {
						console.log(res)
						return res;
					})
				.then(resp => getdataWeatherbit(resp,tripDays))
				.then( res =>{
					let el = document.getElementById("weatherData")
					if (tripDays > 16){
						days=15;
					}
					else{
						let days = tripDays;
						let i;
						for( i=0;i<=days;i++){
							el.innerHTML += res.data[i].datetime+' : '+ res.data[i].weather.description +' '+
							"<img  class=\"icon\" src=\"icons/"+res.data[i].weather.icon+".png \" />"
							+"<br/></br></br>"
					 		}
						}
					})
				.then( await apiPixacall({'coun':country,'city': city})
				.then( res => {
						console.log(res)
						let element = document.getElementById("image")
						console.log(element);
						element.classList.add('img')
						element.src = res.hits[ran].webformatURL;	
					}))
			}
			
				
		}
		else
			alert("trips be planned in future only")
	}







