import { handle_submit } from '../client/js/form_handler.js'
import { setInputDates } from '../client/js/default_functions.js'
import  './styles/base.scss'
import './styles/input.scss'

export {
	handle_submit
}

setInputDates();

window.addEventListener('DOMContentLoaded', (event) => {
    let submit = document.getElementById("button")
	submit.addEventListener('click', handle_submit);
});







