export function setInputDates() {
	// This function is used to set html attributes of input dates
	let today = new Date();
	today.setDate(today.getDate());
	let minDate = today.toISOString().split('T')[0]
	today.setDate(today.getDate() + 2);
	let defaultEndDate = today.toISOString().split('T')[0];
	today.setDate(today.getDate() + 14);
	let maxDate = today.toISOString().split('T')[0];


	document.getElementById("start_date").setAttribute("min", minDate);
	document.getElementById("start_date").setAttribute("max", maxDate);
	document.getElementById("start_date").setAttribute("value", minDate);
	document.getElementById("end_date").setAttribute("min", minDate);
	document.getElementById("end_date").setAttribute("max", maxDate);
	document.getElementById("end_date").setAttribute("value", defaultEndDate);

}

export async function getTodayDateStr() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    return today
}

export async function daysBetweenDates(s_date,e_date){
	// takes start_date(string) and end_date(string) as input returns number of dats (int)
	const msPerDay =24 * 60 * 60 * 1000;

	let start = new Date(s_date).getTime()
	let end =  new Date(e_date).getTime()

	let diff =  (end - start) / msPerDay;
	let daysLeft = Math.round(diff)

	return daysLeft;
}

export async function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function isEverythingValid(country, city, start_date, end_date){
	if(country == ""){
		alert("Please enter country name")
		return false;
	}

	if(city == ""){
		alert("Please enter city name")
		return false;
	}

	let s = new Date(start_date)
	let e = new Date(end_date)
	let today = await getTodayDateStr();
	let t = new Date(today);

	if(s > e){
		alert("Start date should be less than or euqal to end date")
		return false;
	}

	if(s < t){
		alert("Start date cannot be in past")
		return false;
	}

	if(await daysBetweenDates(today, end_date) > 16){
		alert("End date must be less than 16 days from today")
		return false;
	}
	return true;
}