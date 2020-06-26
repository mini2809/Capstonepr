import { handle_submit } from '../client/js/form_handler.js'
import  './styles/base.css'
import './styles/input.css'

export {
	handle_submit
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
	let submit = document.getElementById("button-style")
	submit.addEventListener('click', handle_submit);
});





