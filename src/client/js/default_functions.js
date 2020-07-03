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