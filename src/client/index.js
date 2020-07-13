import { handle_submit, handle_transition } from '../client/js/form_handler.js'
import { setInputDates } from '../client/js/default_functions.js'
import { fetchSaveTrips ,CreateCard ,fetchImage, TripDaysAway } from '../client/js/fetchSaveTrips.js' 
import { modal } from '../client/js/modal.js' 
import { createCards } from '../client/js/fetchSaveTrips.js'
import './styles/base.scss'
import './styles/input.scss'
import './styles/card.scss'
import './styles/modal-card.scss'

export {
	handle_submit
}

setInputDates();



window.addEventListener('DOMContentLoaded', (event) => {
	fetchSaveTrips();
	let submit = document.getElementById("submit_button")
   	submit.addEventListener('click', handle_submit);
   
    //card.addEventListener('click',modal(event))
    //submit.addEventListener('click', );
   	//submit.addEventListener('click',modal(event));
    //submit.addEventListener('click', saveTrips);
	//submit.addEventListener('click',function temp(event){
	// 	handle_transition(event);
	// });
});
